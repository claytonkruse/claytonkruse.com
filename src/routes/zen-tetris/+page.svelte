<script lang="ts">
	const COLS = 10;
	const ROWS = 20;
	const CELL = 28;
	const TICK_MS = 2000;
	// The top of the stack is kept this many rows above the bottom of the screen; the board
	// scrolls down as it grows and back up as lines clear.
	const MAX_STACK = 6;
	// How quickly the board scrolls into place, how quickly the view catches up with a piece
	// that's fallen out of sight, and how quickly rows above a cleared line fall into place.
	// Smaller is snappier.
	const SCROLL_EASE_MS = 700;
	const CATCHUP_EASE_MS = 150;
	const COLLAPSE_EASE_MS = 120;
	// Rows kept visible beneath a piece that's falling below the screen.
	const FOLLOW_MARGIN = 2;
	// Minimap pixels per cell, and how many scrolled-off rows it remembers.
	const MINI = 4;
	const MAX_HISTORY = 2000;
	// Lengths of the hard drop streak and line clear flash.
	const TRAIL_MS = 220;
	const CLEAR_MS = 380;
	// Delay between the AI's moves, so you can watch it think.
	const AI_MS = 120;

	type Cell = string | null;
	type Piece = { shape: number[][]; color: string; x: number; y: number };
	// Short-lived visual effects. Their `y` values are world rows, kept in step with scrolling.
	type Effect =
		| { kind: 'trail'; start: number; x: number; y1: number; y2: number; color: string }
		| { kind: 'clear'; start: number; y: number; cells: Cell[] };

	const SHAPES: Record<string, { shape: number[][]; color: string }> = {
		I: { shape: [[1, 1, 1, 1]], color: '#00f0ff' },
		O: {
			shape: [
				[1, 1],
				[1, 1]
			],
			color: '#fff200'
		},
		T: {
			shape: [
				[0, 1, 0],
				[1, 1, 1]
			],
			color: '#d400ff'
		},
		S: {
			shape: [
				[0, 1, 1],
				[1, 1, 0]
			],
			color: '#39ff14'
		},
		Z: {
			shape: [
				[1, 1, 0],
				[0, 1, 1]
			],
			color: '#ff1f4f'
		},
		J: {
			shape: [
				[1, 0, 0],
				[1, 1, 1]
			],
			color: '#2b6bff'
		},
		L: {
			shape: [
				[0, 0, 1],
				[1, 1, 1]
			],
			color: '#ff7a00'
		}
	};

	let bag: string[] = [];
	// The whole playfield, top to bottom. The screen normally shows its top ROWS rows; everything
	// beneath has scrolled off the bottom but is still in play, so pieces can fall down into it.
	let world: Cell[][] = $state.raw(emptyWorld());
	let piece: Piece = $state(randomPiece());
	let next: Piece = $state(randomPiece());
	let lines = $state(0);
	let paused = $state(false);
	const scrolled = $derived(world.length - ROWS);
	// How far down the world the screen is, in pixels. It eases toward 0 (or toward a piece
	// that has fallen below the screen), which is what makes scrolling smooth.
	let cameraY = $state(0);
	// Per-row extra lift, for rows above a cleared line that are still falling into place.
	let rowLift: number[] = $state.raw(Array(ROWS).fill(0));
	let effects: Effect[] = $state.raw([]);
	let clock = $state(0);
	let aiEnabled = $state(false);
	// Off by default: the AI lines the piece up, then waits for it to fall on its own.
	let aiCanDrop = $state(false);
	// Bumped every time a new piece spawns, so the AI knows when to plan again.
	let pieceId = 0;
	let plan: { id: number; rotations: number; x: number } | null = null;

	let canvas: HTMLCanvasElement | undefined = $state();
	let preview: HTMLCanvasElement | undefined = $state();
	let minimap: HTMLCanvasElement | undefined = $state();

	function emptyRow(): Cell[] {
		return Array(COLS).fill(null);
	}

	function emptyWorld(): Cell[][] {
		return Array.from({ length: ROWS }, emptyRow);
	}

	function randomPiece(): Piece {
		if (bag.length === 0) bag = Object.keys(SHAPES).sort(() => Math.random() - 0.5);
		const { shape, color } = SHAPES[bag.pop()!];
		return { shape, color, x: Math.floor((COLS - shape[0].length) / 2), y: 0 };
	}

	function collides(shape: number[][], x: number, y: number): boolean {
		for (let r = 0; r < shape.length; r++)
			for (let c = 0; c < shape[r].length; c++) {
				if (!shape[r][c]) continue;
				const bx = x + c;
				const by = y + r;
				if (bx < 0 || bx >= COLS || by >= world.length) return true;
				if (by >= 0 && world[by][bx]) return true;
			}
		return false;
	}

	function rotate(shape: number[][], dir: 1 | -1): number[][] {
		const h = shape.length;
		const w = shape[0].length;
		return Array.from({ length: w }, (_, r) =>
			Array.from({ length: h }, (_, c) => (dir === 1 ? shape[h - 1 - c][r] : shape[c][w - 1 - r]))
		);
	}

	function tryMove(dx: number, dy: number): boolean {
		if (collides(piece.shape, piece.x + dx, piece.y + dy)) return false;
		piece.x += dx;
		piece.y += dy;
		return true;
	}

	function tryRotate(dir: 1 | -1) {
		const shape = rotate(piece.shape, dir);
		for (const kick of [0, -1, 1, -2, 2]) {
			if (!collides(shape, piece.x + kick, piece.y)) {
				piece.shape = shape;
				piece.x += kick;
				return;
			}
		}
	}

	function lock() {
		const placed = [...world];
		piece.shape.forEach((row, r) =>
			row.forEach((v, c) => {
				const y = piece.y + r;
				if (!v || y < 0) return;
				placed[y] = [...placed[y]];
				placed[y][piece.x + c] = piece.color;
			})
		);
		world = placed;

		const now = performance.now();
		const fullRows = world.flatMap((row, y) => (row.every(Boolean) ? [y] : []));
		const cleared = fullRows.length;
		lines += cleared;
		if (cleared) {
			effects = [
				...effects,
				...fullRows.map((y) => ({ kind: 'clear' as const, start: now, y, cells: world[y] }))
			];
			// Each surviving row starts where it was and slides down past the cleared lines.
			const keptRows = world.flatMap((_, y) => (fullRows.includes(y) ? [] : [y]));
			rowLift = [
				...Array(cleared).fill(0),
				...keptRows.map((y, i) => (i + cleared - y) * CELL + (rowLift[y] ?? 0))
			];
			world = [...Array.from({ length: cleared }, emptyRow), ...keptRows.map((y) => world[y])];
		}

		// Zen mode: keep the top of the stack MAX_STACK rows above the bottom of the screen.
		// A growing stack scrolls the board down instead of topping out, and after lines clear
		// it scrolls back down to earlier rows (but never past the very bottom of the world).
		const stackTop = world.findIndex((row) => row.some(Boolean));
		const view = Math.min(
			(stackTop < 0 ? world.length : stackTop) - (ROWS - MAX_STACK),
			world.length - ROWS
		);
		shiftWorld(-view);
		if (world.length > ROWS + MAX_HISTORY) {
			world = world.slice(0, ROWS + MAX_HISTORY);
			rowLift = rowLift.slice(0, ROWS + MAX_HISTORY);
		}

		piece = next;
		// When the stack just pushed the board down, spawn at the top of what's on screen so the
		// new piece rides along with the scroll. Otherwise spawn at the very top; if the view had
		// followed a piece down, it hurries back up to meet the new one.
		piece.y = Math.max(0, Math.min(Math.floor(cameraY / CELL), -view));
		pieceId++;
		next = randomPiece();
	}

	function step() {
		if (!tryMove(0, 1)) lock();
	}

	// Add (positive) or remove (negative) empty rows at the top of the world, keeping
	// everything on screen exactly where it was so the camera can ease to the new spot.
	function shiftWorld(rows: number) {
		if (!rows) return;
		world = rows > 0 ? [...Array.from({ length: rows }, emptyRow), ...world] : world.slice(-rows);
		rowLift = rows > 0 ? [...Array(rows).fill(0), ...rowLift] : rowLift.slice(-rows);
		effects = effects.map((e) =>
			e.kind === 'trail' ? { ...e, y1: e.y1 + rows, y2: e.y2 + rows } : { ...e, y: e.y + rows }
		);
		cameraY += rows * CELL;
	}

	function hardDrop() {
		const startY = piece.y;
		while (tryMove(0, 1));
		const now = performance.now();
		// One streak per column, from where the piece was to where it landed.
		const trails: Effect[] = [];
		for (let c = 0; c < piece.shape[0].length; c++) {
			const top = piece.shape.findIndex((row) => row[c]);
			if (top < 0 || piece.y === startY) continue;
			trails.push({
				kind: 'trail',
				start: now,
				x: piece.x + c,
				y1: startY + top,
				y2: piece.y + top,
				color: piece.color
			});
		}
		effects = [...effects, ...trails];
		lock();
	}

	function restart() {
		world = emptyWorld();
		bag = [];
		piece = randomPiece();
		next = randomPiece();
		lines = 0;
		cameraY = 0;
		rowLift = Array(ROWS).fill(0);
		effects = [];
		paused = false;
	}

	// Score a finished board the way most Tetris bots do: fewer holes, a lower and flatter
	// stack, and more cleared lines are better. Weights are from Yiyuan Lee's tuned bot.
	function evaluate(grid: Cell[][], cleared: number): number {
		let height = 0;
		let holes = 0;
		let bumpiness = 0;
		let prev = -1;
		for (let x = 0; x < COLS; x++) {
			let top = grid.length;
			for (let y = 0; y < grid.length; y++)
				if (grid[y][x]) {
					top = Math.min(top, y);
				} else if (y > top) holes++;
			const h = grid.length - top;
			height += h;
			if (prev >= 0) bumpiness += Math.abs(h - prev);
			prev = h;
		}
		return -0.510066 * height + 0.760666 * cleared - 0.35663 * holes - 0.184483 * bumpiness;
	}

	function planMove() {
		// Only the top few screens of the world; anything deeper hardly affects the choice.
		const grid = world.slice(0, ROWS * 3);
		const fits = (shape: number[][], x: number, y: number) =>
			shape.every((row, r) =>
				row.every(
					(v, c) =>
						!v ||
						(x + c >= 0 &&
							x + c < COLS &&
							y + r < grid.length &&
							(y + r < 0 || !grid[y + r][x + c]))
				)
			);

		let best = { score: -Infinity, rotations: 0, x: piece.x };
		let shape = piece.shape;
		for (let rotations = 0; rotations < 4; rotations++, shape = rotate(shape, 1)) {
			for (let x = -2; x < COLS; x++) {
				if (!fits(shape, x, piece.y)) continue;
				let y = piece.y;
				while (fits(shape, x, y + 1)) y++;

				const result = grid.map((row) => [...row]);
				shape.forEach((row, r) => row.forEach((v, c) => v && (result[y + r][x + c] = piece.color)));
				const kept = result.filter((row) => row.some((cell) => !cell));
				const cleared = grid.length - kept.length;
				const final = [...Array.from({ length: cleared }, emptyRow), ...kept];

				const score = evaluate(final, cleared);
				if (score > best.score) best = { score, rotations, x };
			}
		}
		plan = { id: pieceId, rotations: best.rotations, x: best.x };
	}

	function aiStep() {
		if (!plan || plan.id !== pieceId) planMove();
		if (!plan) return;
		if (plan.rotations > 0) {
			plan.rotations--;
			tryRotate(1);
		} else if (piece.x !== plan.x) {
			// If a wall or the stack blocks the way, give up on the exact spot and settle for here.
			if (!tryMove(Math.sign(plan.x - piece.x), 0)) plan.x = piece.x;
		} else if (aiCanDrop) hardDrop();
	}

	$effect(() => {
		if (!aiEnabled || paused) return;
		const id = setInterval(aiStep, AI_MS);
		return () => clearInterval(id);
	});

	function act(action: string) {
		if (action === 'pause') paused = !paused;
		if (paused) return;
		if (action === 'left') tryMove(-1, 0);
		else if (action === 'right') tryMove(1, 0);
		else if (action === 'down') tryMove(0, 1);
		else if (action === 'cw') tryRotate(1);
		else if (action === 'ccw') tryRotate(-1);
		else if (action === 'drop') hardDrop();
	}

	const KEYS: Record<string, string> = {
		ArrowLeft: 'left',
		a: 'left',
		ArrowRight: 'right',
		d: 'right',
		ArrowDown: 'down',
		s: 'down',
		ArrowUp: 'cw',
		w: 'cw',
		x: 'cw',
		z: 'ccw',
		' ': 'drop',
		p: 'pause',
		Escape: 'pause'
	};

	function onkeydown(e: KeyboardEvent) {
		const action = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
		if (!action) return;
		e.preventDefault();
		act(action);
	}

	$effect(() => {
		if (paused) return;
		const id = setInterval(step, TICK_MS);
		return () => clearInterval(id);
	});

	$effect(() => {
		let frame: number;
		let last = performance.now();
		const tick = (now: number) => {
			// Normally the camera rests at the top of the world, but it follows a piece that
			// falls below the screen, and hurries if the piece is out of sight.
			const pieceTop = piece.y * CELL;
			const pieceBottom = (piece.y + piece.shape.length) * CELL;
			const target =
				Math.min(
					Math.max(0, piece.y + piece.shape.length + FOLLOW_MARGIN - ROWS),
					world.length - ROWS
				) * CELL;
			const outOfSight = pieceTop < cameraY || pieceBottom > cameraY + ROWS * CELL;
			const scrollEase = Math.exp(-(now - last) / (outOfSight ? CATCHUP_EASE_MS : SCROLL_EASE_MS));
			const collapseEase = Math.exp(-(now - last) / COLLAPSE_EASE_MS);
			if (cameraY !== target)
				cameraY =
					Math.abs(cameraY - target) < 0.5 ? target : target + (cameraY - target) * scrollEase;
			if (effects.length) {
				effects = effects.filter((e) => now - e.start < (e.kind === 'trail' ? TRAIL_MS : CLEAR_MS));
				clock = now;
			}
			// Rows above a cleared line hold still until the clear animation has finished.
			if (rowLift.some(Boolean) && !effects.some((e) => e.kind === 'clear'))
				rowLift = rowLift.map((v) => (v < 0.5 ? 0 : v * collapseEase));
			last = now;
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	});

	function drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, dy = 0) {
		const top = y * CELL + 1 - dy;
		ctx.shadowColor = color;
		ctx.shadowBlur = 10;
		ctx.fillStyle = color;
		ctx.fillRect(x * CELL + 1, top, CELL - 2, CELL - 2);
		ctx.shadowBlur = 0;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
		ctx.fillRect(x * CELL + 1, top, CELL - 2, 4);
	}

	function drawOutline(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, dy = 0) {
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.strokeRect(x * CELL + 2, y * CELL + 2 - dy, CELL - 4, CELL - 4);
		ctx.lineWidth = 1;
	}

	$effect(() => {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);

		ctx.strokeStyle = 'rgba(255, 237, 213, 0.05)';
		for (let x = 0; x <= COLS; x++) ctx.strokeRect(x * CELL, 0, 0, ROWS * CELL);
		for (let y = 0; y <= ROWS; y++) ctx.strokeRect(0, y * CELL, COLS * CELL, 0);

		const first = Math.max(0, Math.floor(cameraY / CELL) - 1);
		const last = Math.min(world.length, Math.ceil(cameraY / CELL) + ROWS + 1);
		for (let y = first; y < last; y++)
			world[y].forEach((cell, x) => cell && drawCell(ctx, x, y, cell, cameraY + (rowLift[y] ?? 0)));

		for (const e of effects) {
			const t = Math.min(1, (clock - e.start) / (e.kind === 'trail' ? TRAIL_MS : CLEAR_MS));
			if (e.kind === 'trail') {
				// A streak that fades toward where the piece came from.
				const top = e.y1 * CELL - cameraY;
				const bottom = e.y2 * CELL - cameraY;
				const gradient = ctx.createLinearGradient(0, top, 0, bottom);
				gradient.addColorStop(0, 'transparent');
				gradient.addColorStop(1, e.color);
				ctx.globalAlpha = 0.6 * (1 - t);
				ctx.fillStyle = gradient;
				ctx.fillRect(e.x * CELL + 4, top, CELL - 8, bottom - top);
				ctx.globalAlpha = 1;
			} else {
				// The cleared blocks flash white, shrink, and fade while a white bar collapses inward.
				const top = e.y * CELL - cameraY;
				const size = (CELL - 2) * (1 - t);
				ctx.globalAlpha = 1 - t;
				e.cells.forEach((cell, x) => {
					if (!cell) return;
					ctx.fillStyle = t < 0.25 ? '#ffffff' : cell;
					ctx.fillRect(x * CELL + CELL / 2 - size / 2, top + CELL / 2 - size / 2, size, size);
				});
				const width = COLS * CELL * (1 - t);
				ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
				ctx.fillRect((COLS * CELL - width) / 2, top + CELL / 2 - 2, width, 4);
				ctx.globalAlpha = 1;
			}
		}

		// The ghost shows where the piece lands on the settled stack, so hide it while rows
		// are still waiting to fall into place after a clear.
		if (!effects.some((e) => e.kind === 'clear')) {
			let ghostY = piece.y;
			while (!collides(piece.shape, piece.x, ghostY + 1)) ghostY++;
			piece.shape.forEach((row, r) =>
				row.forEach((v, c) => v && drawOutline(ctx, piece.x + c, ghostY + r, piece.color, cameraY))
			);
		}
		piece.shape.forEach((row, r) =>
			row.forEach((v, c) => v && drawCell(ctx, piece.x + c, piece.y + r, piece.color, cameraY))
		);
	});

	$effect(() => {
		const ctx = minimap?.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, COLS * MINI, world.length * MINI);

		world.forEach((row, y) =>
			row.forEach((cell, x) => {
				if (!cell) return;
				ctx.fillStyle = cell;
				ctx.fillRect(x * MINI, y * MINI, MINI, MINI);
			})
		);
		piece.shape.forEach((row, r) =>
			row.forEach((v, c) => {
				if (!v) return;
				ctx.fillStyle = piece.color;
				ctx.fillRect((piece.x + c) * MINI, (piece.y + r) * MINI, MINI, MINI);
			})
		);

		// The box shows what's on screen.
		const boxTop = (cameraY / CELL) * MINI;
		ctx.fillStyle = 'rgba(255, 237, 213, 0.08)';
		ctx.fillRect(0, boxTop, COLS * MINI, ROWS * MINI);
		ctx.strokeStyle = 'rgba(255, 237, 213, 0.4)';
		ctx.strokeRect(0.5, boxTop + 0.5, COLS * MINI - 1, ROWS * MINI - 1);
	});

	$effect(() => {
		const ctx = preview?.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, 4 * CELL, 4 * CELL);
		const ox = (4 - next.shape[0].length) / 2;
		const oy = (4 - next.shape.length) / 2;
		next.shape.forEach((row, r) =>
			row.forEach((v, c) => v && drawCell(ctx, ox + c, oy + r, next.color))
		);
	});
</script>

<svelte:head>
	<title>Zen Tetris - Clayton Kruse</title>
	<meta
		name="description"
		content="Zen Tetris: Tetris where you can't lose. When the stack reaches the top, the board just scrolls."
	/>
</svelte:head>

<svelte:window {onkeydown} />

<hgroup class="mb-6 text-center">
	<h1 class="text-4xl tracking-wider">Zen Tetris</h1>
	<p class="text-sm text-orange-100/70">
		You can't lose. When the stack reaches the top, it just scrolls.
	</p>
</hgroup>

<div class="flex flex-wrap items-start justify-center gap-4 sm:gap-6">
	<div
		class="max-h-[562px] overflow-y-auto border border-current/20 bg-black/40"
		title="Everything that has scrolled off the bottom"
	>
		<canvas bind:this={minimap} width={COLS * MINI} height={world.length * MINI} class="block"
		></canvas>
	</div>

	<div class="relative border border-current/20 bg-black/40">
		<canvas bind:this={canvas} width={COLS * CELL} height={ROWS * CELL} class="block"></canvas>
		{#if paused}
			<div
				class="absolute inset-0 flex items-center justify-center bg-black/60 text-2xl tracking-widest"
			>
				PAUSED
			</div>
		{/if}
	</div>

	<aside class="flex w-40 flex-col gap-4 text-sm">
		<div>
			<h2 class="mb-1 uppercase tracking-widest text-orange-100/70">Next</h2>
			<canvas
				bind:this={preview}
				width={4 * CELL}
				height={4 * CELL}
				class="border border-current/20 bg-black/40"
			></canvas>
		</div>
		<dl class="grid grid-cols-2 gap-x-2">
			<dt>Lines</dt>
			<dd class="text-right font-mono">{lines}</dd>
			<dt>Scrolled</dt>
			<dd class="text-right font-mono">{scrolled}</dd>
		</dl>
		<label class="flex cursor-pointer items-center gap-2">
			<input type="checkbox" bind:checked={aiEnabled} class="accent-green-600" />
			AI plays for you
		</label>
		<label class="-mt-3 flex cursor-pointer items-center gap-2" class:opacity-50={!aiEnabled}>
			<input
				type="checkbox"
				bind:checked={aiCanDrop}
				disabled={!aiEnabled}
				class="accent-green-600"
			/>
			Let the AI drop pieces
		</label>
		<div class="flex gap-2">
			<button class="btn" onclick={() => act('pause')}>{paused ? 'Resume' : 'Pause'}</button>
			<button class="btn" onclick={restart}>Restart</button>
		</div>
		<ul class="text-xs leading-5 text-orange-100/70">
			<li>← → / A D: move</li>
			<li>↑ / W / X: rotate</li>
			<li>Z: rotate back</li>
			<li>↓ / S: soft drop</li>
			<li>Space: hard drop</li>
			<li>P / Esc: pause</li>
		</ul>
	</aside>
</div>

<div class="mx-auto mt-6 grid max-w-xs grid-cols-3 gap-2 sm:hidden">
	<button class="btn" onclick={() => act('ccw')}>⟲</button>
	<button class="btn" onclick={() => act('drop')}>⤓</button>
	<button class="btn" onclick={() => act('cw')}>⟳</button>
	<button class="btn" onclick={() => act('left')}>←</button>
	<button class="btn" onclick={() => act('down')}>↓</button>
	<button class="btn" onclick={() => act('right')}>→</button>
</div>

<style>
	@reference '../style.css';

	.btn {
		@apply cursor-pointer rounded-md border border-current/30 bg-current/5 px-3 py-1 hover:bg-current/10;
	}
</style>

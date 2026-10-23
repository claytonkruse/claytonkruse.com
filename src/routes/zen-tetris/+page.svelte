<script lang="ts">
	import { fly } from 'svelte/transition';
	import * as sound from './sounds';

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
	const CLEAR_MS = 550;
	// Points for clearing 0 to 4 lines at once, plain or with a T-spin, and the bonus for
	// clearing the whole board.
	const LINE_POINTS = [0, 100, 300, 500, 800];
	const TSPIN_POINTS = [0, 800, 1200, 1600];
	const MINI_TSPIN_POINTS = [0, 200, 400];
	const PERFECT_CLEAR_POINTS = [0, 800, 1200, 1800, 2000];
	const CLEAR_NAMES = ['', 'Single', 'Double', 'Triple', 'Tetris'];
	// How long each "+points name" callout stays next to the score.
	const AWARD_MS = 1800;
	// Delay between the AI's moves, so you can watch it think.
	const AI_MS = 120;

	type Cell = string | null;
	type Piece = { type: string; shape: number[][]; color: string; x: number; y: number };
	// Short-lived visual effects. Their `y` values are world rows, kept in step with scrolling.
	type Effect =
		| { kind: 'trail'; start: number; x: number; y1: number; y2: number; color: string }
		| {
				kind: 'clear';
				start: number;
				y: number;
				// Columns the last piece filled in this row; the blast spreads out from here.
				from: number;
				to: number;
				shards: Shard[];
		  };
	// A fragment of a cleared block. Position is in pixels relative to the row's top-left corner;
	// velocity is in pixels per second.
	type Shard = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		spin: number;
		color: string;
	};

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
	// Scored by the Tetris Guideline at a fixed level 1, since zen mode never speeds up.
	let score = $state(0);
	// Consecutive locks that cleared lines, minus one; -1 means no combo is running.
	let combo = -1;
	// Whether the last line clear was a tetris or T-spin, which earns the next one a bonus.
	let backToBack = false;
	// Each part of the score the latest line clear earned, shown on the board for a moment.
	type Callout = { id: number; awards: { points: number; name: string }[] };
	// Holds at most one callout; a list so each one fades out on its own, undisturbed by the next.
	let callouts: Callout[] = $state([]);
	let calloutId = 0;
	// T-spins only count when rotating was the last thing that moved the piece.
	let lastMoveRotated = false;
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
	let muted = $state(false);
	// Bumped every time a new piece spawns, so the AI knows when to plan again.
	let pieceId = 0;
	let plan: { id: number; rotations: number; x: number } | null = null;

	let canvas: HTMLCanvasElement | undefined = $state();
	let preview: HTMLCanvasElement | undefined = $state();
	let minimap: HTMLCanvasElement | undefined = $state();
	// Covers the whole window so line clear beams can shoot past the edges of the board.
	let overlay: HTMLCanvasElement | undefined = $state();

	function emptyRow(): Cell[] {
		return Array(COLS).fill(null);
	}

	function emptyWorld(): Cell[][] {
		return Array.from({ length: ROWS }, emptyRow);
	}

	function randomPiece(): Piece {
		if (bag.length === 0) bag = Object.keys(SHAPES).sort(() => Math.random() - 0.5);
		const type = bag.pop()!;
		const { shape, color } = SHAPES[type];
		return { type, shape, color, x: Math.floor((COLS - shape[0].length) / 2), y: 0 };
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
		lastMoveRotated = false;
		return true;
	}

	function tryRotate(dir: 1 | -1): boolean {
		const shape = rotate(piece.shape, dir);
		for (const kick of [0, -1, 1, -2, 2]) {
			if (!collides(shape, piece.x + kick, piece.y)) {
				piece.shape = shape;
				piece.x += kick;
				lastMoveRotated = true;
				return true;
			}
		}
		return false;
	}

	// Whether the piece is a T that just rotated into a slot, by the three-corner rule: at least
	// three of the four cells diagonal to its center are filled. With both corners on the side
	// it points toward filled it's a full T-spin; otherwise it's a mini.
	function tSpin(): 'full' | 'mini' | null {
		if (piece.type !== 'T' || !lastMoveRotated) return null;
		const { shape } = piece;
		const has = (r: number, c: number) => !!shape[r]?.[c];
		const sides = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1]
		];
		// The center is the block touching three others, and it points away from the side that
		// has no block.
		const isCenter = (r: number, c: number) =>
			sides.filter(([dr, dc]) => has(r + dr, c + dc)).length === 3;
		const r = shape.findIndex((row, r) => row.some((_, c) => isCenter(r, c)));
		const c = shape[r].findIndex((_, c) => isCenter(r, c));
		const [fr, fc] = sides.find(([dr, dc]) => !has(r - dr, c - dc))!;
		const filled = (dr: number, dc: number) =>
			collides([[1]], piece.x + c + dc, piece.y + r + dr) ? 1 : 0;
		const front = filled(fr + fc, fc + fr) + filled(fr - fc, fc - fr);
		const back = filled(-fr + fc, -fc + fr) + filled(-fr - fc, -fc - fr);
		if (front === 2 && back >= 1) return 'full';
		if (back === 2 && front === 1) return 'mini';
		return null;
	}

	function lock() {
		const spin = tSpin();
		sound.lock(piece.x + piece.shape[0].length / 2);
		const placed = [...world];
		const placedCols = new Map<number, number[]>();
		piece.shape.forEach((row, r) =>
			row.forEach((v, c) => {
				const y = piece.y + r;
				if (!v || y < 0) return;
				placed[y] = [...placed[y]];
				placed[y][piece.x + c] = piece.color;
				placedCols.set(y, [...(placedCols.get(y) ?? []), piece.x + c]);
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
				...fullRows.map((y) => {
					const cols = placedCols.get(y) ?? [0, COLS - 1];
					const from = Math.min(...cols);
					const to = Math.max(...cols);
					return {
						kind: 'clear' as const,
						start: now,
						y,
						from,
						to,
						shards: shatterRow(world[y], ((from + to + 1) / 2) * CELL)
					};
				})
			];
			// Each surviving row starts where it was and slides down past the cleared lines.
			const keptRows = world.flatMap((_, y) => (fullRows.includes(y) ? [] : [y]));
			rowLift = [
				...Array(cleared).fill(0),
				...keptRows.map((y, i) => (i + cleared - y) * CELL + (rowLift[y] ?? 0))
			];
			world = [...Array.from({ length: cleared }, emptyRow), ...keptRows.map((y) => world[y])];
		}

		if (cleared) {
			// There's no such thing as a mini T-spin triple, so count one as a full T-spin.
			const kind = spin === 'mini' && cleared > 2 ? 'full' : spin;
			const difficult = cleared === 4 || !!kind;
			const base = (
				kind === 'full' ? TSPIN_POINTS : kind === 'mini' ? MINI_TSPIN_POINTS : LINE_POINTS
			)[cleared];
			const prefix = kind === 'full' ? 'T-Spin ' : kind === 'mini' ? 'Mini T-Spin ' : '';
			const earned = [{ points: base, name: prefix + CLEAR_NAMES[cleared] }];
			if (difficult && backToBack) earned.push({ points: base / 2, name: 'Back-to-Back' });
			if (world.every((row) => row.every((cell) => !cell)))
				earned.push({
					points: difficult && backToBack && cleared === 4 ? 3200 : PERFECT_CLEAR_POINTS[cleared],
					name: 'Perfect Clear'
				});
			backToBack = difficult;
			combo++;
			if (combo > 0) earned.push({ points: 50 * combo, name: `Combo ×${combo}` });
			sound.clear(cleared, combo);

			for (const award of earned) score += award.points;
			const id = calloutId++;
			callouts = [{ id, awards: earned }];
			setTimeout(() => (callouts = callouts.filter((c) => c.id !== id)), AWARD_MS);
		} else combo = -1;

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

	// Blow a full row into shards, each the color of the block it came from, that burst
	// outward from `originX` (in pixels).
	function shatterRow(cells: Cell[], originX: number): Shard[] {
		const shards: Shard[] = [];
		for (let x = 0; x < COLS; x++)
			for (let i = 0; i < 6; i++) {
				const cx = x * CELL + Math.random() * CELL;
				shards.push({
					x: cx,
					y: Math.random() * CELL,
					vx: (cx - originX) * 2.5 + (Math.random() - 0.5) * 500,
					vy: -Math.random() * 450 + 100,
					size: 3 + Math.random() * 6,
					spin: (Math.random() - 0.5) * 20,
					color: cells[x] ?? '#ffffff'
				});
			}
		return shards;
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
		sound.hardDrop();
		lock();
	}

	function restart() {
		world = emptyWorld();
		bag = [];
		piece = randomPiece();
		next = randomPiece();
		lines = 0;
		score = 0;
		callouts = [];
		combo = -1;
		backToBack = false;
		lastMoveRotated = false;
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
			if (tryRotate(1)) sound.rotate();
		} else if (piece.x !== plan.x) {
			// If a wall or the stack blocks the way, give up on the exact spot and settle for here.
			if (tryMove(Math.sign(plan.x - piece.x), 0)) sound.move();
			else plan.x = piece.x;
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
		if (action === 'left') {
			if (tryMove(-1, 0)) sound.move();
		} else if (action === 'right') {
			if (tryMove(1, 0)) sound.move();
		} else if (action === 'down') tryMove(0, 1);
		else if (action === 'cw') {
			if (tryRotate(1)) sound.rotate();
		} else if (action === 'ccw') {
			if (tryRotate(-1)) sound.rotate();
		} else if (action === 'drop') hardDrop();
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
		sound.wake();
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
			// Rows above a cleared line start falling into place right away.
			if (rowLift.some(Boolean)) rowLift = rowLift.map((v) => (v < 0.5 ? 0 : v * collapseEase));
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

	$effect(() => {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);

		// A quick shake right as a tetris is obliterated. Each cleared line gets its own effect, and
		// lines cleared together share a start time.
		const blasts = effects.filter((e) => e.kind === 'clear' && clock - e.start < CLEAR_MS * 0.3);
		if (blasts.some((b) => blasts.filter((e) => e.start === b.start).length >= 4)) {
			const strength = 11;
			ctx.translate((Math.random() - 0.5) * strength, (Math.random() - 0.5) * strength);
		}

		ctx.strokeStyle = 'rgba(255, 237, 213, 0.05)';
		for (let x = 0; x <= COLS; x++) ctx.strokeRect(x * CELL, 0, 0, ROWS * CELL);
		for (let y = 0; y <= ROWS; y++) ctx.strokeRect(0, y * CELL, COLS * CELL, 0);

		// The ghost shows where the piece lands by tinting the grid lines around those cells, so
		// hide it while rows are still falling into place after a clear. All the cells go in one
		// path so shared edges aren't drawn twice.
		if (!rowLift.some(Boolean)) {
			let ghostY = piece.y;
			while (!collides(piece.shape, piece.x, ghostY + 1)) ghostY++;
			ctx.beginPath();
			piece.shape.forEach((row, r) =>
				row.forEach(
					(v, c) => v && ctx.rect((piece.x + c) * CELL, (ghostY + r) * CELL - cameraY, CELL, CELL)
				)
			);
			ctx.globalAlpha = 0.5;
			ctx.strokeStyle = piece.color;
			ctx.stroke();
			ctx.globalAlpha = 1;
		}

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
				ctx.globalAlpha = 0.3 * (1 - t);
				ctx.fillStyle = gradient;
				ctx.fillRect(e.x * CELL + 8, top, CELL - 16, bottom - top);
				ctx.globalAlpha = 1;
			} else {
				// Obliterate the row: the blocks burst into glowing shards, in the colors of the blocks
				// they came from, that fly apart and fall.
				const top = e.y * CELL - cameraY;
				const secs = (t * CLEAR_MS) / 1000;

				// The beams are drawn on the full-page overlay below, so they can leave the board.
				ctx.shadowBlur = 8;
				ctx.globalAlpha = Math.min(1, 1.6 * (1 - t));
				for (const shard of e.shards) {
					const size = shard.size * (1 - 0.6 * t);
					ctx.save();
					ctx.translate(
						shard.x + shard.vx * secs,
						top + shard.y + shard.vy * secs + 0.5 * 1400 * secs * secs
					);
					ctx.rotate(shard.spin * secs);
					ctx.fillStyle = shard.color;
					ctx.shadowColor = shard.color;
					ctx.fillRect(-size / 2, -size / 2, size, size);
					ctx.restore();
				}
				ctx.shadowBlur = 0;
				ctx.globalAlpha = 1;
			}
		}

		piece.shape.forEach((row, r) =>
			row.forEach((v, c) => v && drawCell(ctx, piece.x + c, piece.y + r, piece.color, cameraY))
		);
	});

	$effect(() => {
		const ctx = overlay?.getContext('2d');
		if (!ctx || !overlay || !canvas) return;
		const dpr = window.devicePixelRatio || 1;
		const width = Math.round(innerWidth * dpr);
		const height = Math.round(innerHeight * dpr);
		if (overlay.width !== width || overlay.height !== height) {
			overlay.width = width;
			overlay.height = height;
		}
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, width, height);
		ctx.scale(dpr, dpr);

		const board = canvas.getBoundingClientRect();
		for (const e of effects) {
			if (e.kind !== 'clear') continue;
			const t = Math.min(1, (clock - e.start) / CLEAR_MS);

			// A beam rises from where the last piece landed, up through the columns that piece filled.
			const spread = 1 - (1 - t) ** 3;
			const originX = board.left + ((e.from + e.to + 1) / 2) * CELL;
			const midY = board.top + e.y * CELL - cameraY + CELL / 2;
			ctx.shadowColor = '#ffc94d';
			ctx.shadowBlur = 6;

			const beamW = (e.to - e.from + 1) * CELL * 0.4 * (1 - 0.6 * t);
			const reachY = Math.max(innerHeight, ROWS * CELL) * 0.375 * spread;
			const up = ctx.createLinearGradient(0, midY - reachY, 0, midY);
			up.addColorStop(0, 'rgba(255, 201, 77, 0)');
			up.addColorStop(1, '#ffc94d');
			ctx.globalAlpha = 0.15 * (1 - t);
			ctx.fillStyle = up;
			ctx.fillRect(originX - beamW / 2, midY - reachY, beamW, reachY);
		}
		ctx.shadowBlur = 0;
		ctx.globalAlpha = 1;
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

<svelte:window {onkeydown} onpointerdown={sound.wake} />

<canvas bind:this={overlay} class="pointer-events-none fixed inset-0 z-50 h-full w-full"></canvas>

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
		<!-- What each part of the score was earned for, in the middle of the board. Every callout
			 sits in the same grid cell, so one fading out never shifts the next one. -->
		<div
			class="pointer-events-none absolute inset-0 grid place-items-center text-[#ffc94d] [text-shadow:0_0_8px_rgb(0_0_0)]"
			aria-live="polite"
		>
			{#each callouts as callout (callout.id)}
				<ul
					class="col-start-1 row-start-1 flex flex-col items-center gap-1 tracking-wide"
					in:fly={{ y: 8, duration: 250 }}
					out:fly={{ y: -16, duration: 500 }}
				>
					{#each callout.awards as award, i (i)}
						<li>
							<span class="font-mono">+{award.points.toLocaleString()}</span>
							{award.name}
						</li>
					{/each}
				</ul>
			{/each}
		</div>
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
			<dt>Score</dt>
			<dd class="text-right font-mono">{score.toLocaleString()}</dd>
			<dt>Lines</dt>
			<dd class="text-right font-mono">{lines}</dd>
			<dt>Scrolled</dt>
			<dd class="text-right font-mono">{scrolled}</dd>
		</dl>
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
		<div class="flex flex-col gap-2">
			<label class="flex cursor-pointer items-center gap-2">
				<input
					type="checkbox"
					bind:checked={muted}
					onchange={() => sound.setEnabled(!muted)}
					class="accent-green-600"
				/>
				Mute
			</label>
			<label class="flex cursor-pointer items-center gap-2">
				<input type="checkbox" bind:checked={aiEnabled} class="accent-green-600" />
				AI plays for you
			</label>
			<label class="flex cursor-pointer items-center gap-2" class:opacity-50={!aiEnabled}>
				<input
					type="checkbox"
					bind:checked={aiCanDrop}
					disabled={!aiEnabled}
					class="accent-green-600"
				/>
				Let the AI drop pieces
			</label>
		</div>
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

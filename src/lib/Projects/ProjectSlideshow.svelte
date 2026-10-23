<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	let { slides, interval = 5000 }: { slides: string[]; interval?: number } = $props();

	let current = $state(0);

	// Only advance while on screen, and never for users who prefer reduced motion.
	const advanceInView: Attachment<HTMLElement> = (node) => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let timer: ReturnType<typeof setInterval> | undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				clearInterval(timer);
				if (entry.isIntersecting && !reducedMotion.matches) {
					timer = setInterval(() => (current = (current + 1) % slides.length), interval);
				}
			},
			{ threshold: 0.25 }
		);
		observer.observe(node);

		return () => {
			observer.disconnect();
			clearInterval(timer);
		};
	};
</script>

<div
	{@attach advanceInView}
	class="mb-3 grid aspect-[4/3] border border-current/20"
	aria-hidden="true"
>
	{#each slides as slide, i (slide)}
		<img
			src={slide}
			alt=""
			loading={i === 0 ? 'eager' : 'lazy'}
			decoding="async"
			class="col-start-1 row-start-1 h-full w-full object-cover transition-opacity duration-2000"
			class:opacity-0={i !== current}
		/>
	{/each}
</div>

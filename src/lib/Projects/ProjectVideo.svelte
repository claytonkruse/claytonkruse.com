<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { ProjectVideo } from './projects.svelte.js';

	let { video, poster }: { video: ProjectVideo; poster?: string } = $props();

	// Only play while on screen, and never for users who prefer reduced motion.
	const autoplayInView: Attachment<HTMLVideoElement> = (node) => {
		node.muted = true;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !reducedMotion.matches) {
					node.play().catch(() => {});
				} else {
					node.pause();
				}
			},
			{ threshold: 0.25 }
		);
		observer.observe(node);

		return () => observer.disconnect();
	};
</script>

<video
	{@attach autoplayInView}
	{poster}
	muted
	loop
	playsinline
	disablepictureinpicture
	preload={poster ? 'none' : 'metadata'}
	aria-hidden="true"
	class="mb-3 w-full border border-current/20"
>
	{#if video.webm}
		<source src={video.webm} type={'video/webm; codecs="av01.0.04M.08"'} />
	{/if}
	{#if video.mp4}
		<source src={video.mp4} type={'video/mp4; codecs="avc1.64001F"'} />
	{/if}
</video>

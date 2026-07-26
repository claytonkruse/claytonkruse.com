<script>
	import { onMount } from 'svelte';

	import './style.css';

	import Header from '$lib/components/Header';
	import Footer from '$lib/components/Footer';

	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

	let parallaxOffset = $state(0);
	const PARALLAX_RATE = 0.2;

	function updateParallaxOffset() {
		parallaxOffset = Math.round(window.scrollY * PARALLAX_RATE);
	}

	onMount(() => {
		updateParallaxOffset();
	});
</script>

<svelte:window onscroll={updateParallaxOffset} />

<div id="parallax" class="h-full" style={`--parallax-offset: ${parallaxOffset}px;`}>
	<div class="parallax-backdrop" aria-hidden="true">
		<div class="parallax-backdrop__pattern"></div>
	</div>

	<div id="base">
		<div id="content" class="flex h-max min-h-full flex-col justify-between">
			<Header />

			<main id="main" class="z-40 m-auto p-7">
				{@render children?.()}
			</main>

			<Footer></Footer>
		</div>
	</div>
</div>

<style>
	#parallax {
		position: relative;
		min-height: 100lvh;
		overflow-x: clip;
		isolation: isolate;
	}

	.parallax-backdrop {
		--tile: 256px;
		position: fixed;
		inset: 0;
		z-index: -2;
		overflow: hidden;
		pointer-events: none;
	}

	.parallax-backdrop__pattern {
		position: absolute;
		top: calc(var(--tile) * -1);
		right: 0;
		bottom: calc(var(--tile) * -1);
		left: 0;
		background-image: url(/patterns/fancy-pants.jpg);
		background-repeat: repeat;
		background-size: var(--tile) var(--tile);
		background-position: 0 calc(var(--parallax-offset, 0px) * -1);
		animation: parallax-pattern-drift 50s linear infinite;
		will-change: transform, background-position;
	}

	@keyframes parallax-pattern-drift {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(256px);
		}
	}

	#parallax::after {
		position: fixed;
		inset: 0;
		z-index: -1;
		content: '';
		pointer-events: none;
		background-image: linear-gradient(rgba(255, 128, 0, 0.1), rgba(15, 0, 30, 0.8));
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	#base {
		position: relative;
		min-height: 100%;
	}

	#content {
		position: relative;
		min-height: 100lvh;
	}
</style>

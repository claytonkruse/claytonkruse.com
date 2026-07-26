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

	#parallax::before,
	#parallax::after {
		position: fixed;
		inset: -20lvh 0;
		content: '';
		pointer-events: none;
	}

	#parallax::before {
		z-index: -2;
		background-image: url(/patterns/fancy-pants.jpg);
		background-position: top left;
		background-repeat: repeat;
		background-size: 256px 256px;
		transform: translateY(calc(var(--parallax-offset, 0px) * -1));
		will-change: transform;
	}

	#parallax::after {
		z-index: -1;
		background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5));
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

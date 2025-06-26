<script>
	import '../app.pcss';
	import './style.pcss';

	import Header from '$lib/components/Header';
	import Footer from '$lib/components/Footer';

	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="flex h-max min-h-full flex-col justify-between">
	<Header></Header>

	<main
		id="main"
		class="m-auto border border-zinc-800 border-opacity-35 bg-zinc-50 bg-opacity-50 p-7 backdrop-blur-[1.5px]"
	>
		{@render children?.()}
	</main>

	<Footer></Footer>
</div>

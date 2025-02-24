<script>
	import Header from '$lib/components/Header';
	import Footer from '$lib/components/Footer';

	import './style.css';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="flex h-max min-h-full flex-col justify-between">
	<Header></Header>

	<main id="main" class="m-auto p-7">
		{@render children?.()}
	</main>

	<Footer></Footer>
</div>

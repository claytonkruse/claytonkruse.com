<script>
	import Header from './Header.svelte';
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
	<footer class="px-7 py-3 text-center">
		<small class="font-serif"
			>Clayton Kruse, Developer | View the source code for this website on <a
				href="https://github.com/claytonkruse/claytonkruse.com">GitHub</a
			>.</small
		>
	</footer>
</div>

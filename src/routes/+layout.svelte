<script>
	import Header from './Header.svelte';
	import './style.css';
</script>

<div class="flex min-h-full flex-col justify-between">
	<Header></Header>
	<main id="main" class="m-auto max-w-3xl p-7">
		<slot />
	</main>
	<footer class="px-7 py-3 text-center">
		<small class="font-serif"
			>Clayton Kruse, Developer | View the source code for this website on <a
				href="https://github.com/claytonkruse/claytonkruse.com">GitHub</a
			>.</small
		>
	</footer>
</div>

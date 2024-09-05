<script>
	import Header from './Header.svelte';
	import './style.css';
</script>

<div class="flex min-h-full flex-col justify-between">
	<Header></Header>
	<main id="main" class="m-auto max-w-3xl p-7">
		<slot />
	</main>
	<footer class="py-3 text-center">
		<small class="font-serif">Clayton Kruse, Developer</small>
	</footer>
</div>

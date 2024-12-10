<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Articles | Clayton Kruse</title>
</svelte:head>

<h1 class="mb-2 border-b-[1px] border-b-zinc-800 text-center text-2xl">
	Articles
</h1>
<nav>
	<ul class="list-none p-0">
		{#each data.feed.items as item}
			<li><a href={item.link}>{item.title}</a></li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	li {
		@apply mb-2;
	}
</style>

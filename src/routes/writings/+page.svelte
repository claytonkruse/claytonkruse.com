<script lang="ts">
	import Rss from '~icons/akar-icons/rss';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Writings - Clayton Kruse</title>
	<meta
		name="description"
		content="Articles or blogposts written by Clayton Kruse on a variety of topics."
	/>
	<meta name="keywords" content="articles, article, blog, posts, stories" />
</svelte:head>

<div class="relative mb-2 border-b-[1px] border-b-zinc-800">
	<h1 class="text-center text-3xl">Writings</h1>
	<a href="/rss.xml" class="absolute right-0 bottom-1 inline-flex items-center gap-1 font-mono text-sm">
		<Rss class="size-[0.9em]" />
		RSS
	</a>
</div>

<nav>
	<ul>
		{#each data.posts as item}
			{#if !item.unlisted}
				<li class="flex justify-between gap-4">
					<div>
						<a href={item.slug}>{item.title}</a>
					</div>

					<div class="align-baseline font-mono text-gray-700">
						<svelte:boundary>
							{@const date = new Date(
								item.date.replace('th', '').replace('st', '').replace('nd', '').replace('rd', '')
							)}
							{('0' + (date.getMonth() + 1)).slice(-2)}/{('0' + date.getDate()).slice(
								-2
							)}/{date.getFullYear()}
						</svelte:boundary>
					</div>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	@reference '../style.css';

	li {
		@apply mb-2;
	}
</style>

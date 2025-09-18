<script lang="ts">
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

<h1 class="mb-2 border-b-[1px] border-b-zinc-800 text-center text-3xl">
	Writings
</h1>

<nav>
	<ul>
		{#each data.posts as item}
			<li class="flex justify-between gap-4">
				<div>
					<a href={item.slug}>{item.title}</a>
				</div>

				<div class="align-baseline font-mono text-gray-700">
					<svelte:boundary>
						{@const date = new Date(
							item.date
								.replace('th', '')
								.replace('st', '')
								.replace('nd', '')
								.replace('rd', '')
						)}
						{('0' + (date.getMonth() + 1)).slice(-2)}/{(
							'0' + date.getDate()
						).slice(-2)}/{date.getFullYear()}
					</svelte:boundary>
					<!-- {item.date} -->
				</div>
			</li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	li {
		@apply mb-2;
	}
</style>

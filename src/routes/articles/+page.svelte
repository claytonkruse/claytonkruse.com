<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Articles - Clayton Kruse</title>
	<meta
		name="description"
		content="Articles or blogposts written by Clayton Kruse on a variety of topics."
	/>
	<meta name="keywords" content="articles, article, blog, posts, stories" />
</svelte:head>

<h1 class="mb-2 border-b-[1px] border-b-zinc-800 text-center text-2xl">
	Articles
</h1>
<nav>
	<table>
		<tbody>
			{#each data.feed.items as item}
				<tr>
					<td>
						<a rel="noopener" target="_blank" href={item.link}>{item.title}</a>
					</td>
					<td>
						<svelte:boundary>
							{@const date = new Date(item.pubDate)}
							{('0' + date.getMonth()).slice(-2)}/{('0' + date.getDate()).slice(
								-2
							)}/{date.getFullYear()}
						</svelte:boundary>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</nav>

<style lang="postcss">
	li {
		@apply mb-2;
	}
</style>

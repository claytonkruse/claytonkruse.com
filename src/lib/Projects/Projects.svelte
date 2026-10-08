<script lang="ts">
	import { projects } from './projects.svelte.js';

	const tagSites: Record<string, string> = {
		svelte: 'https://svelte.dev/',
		sveltekit: 'https://svelte.dev/docs/kit',
		gridstack: 'https://gridstackjs.com/',
		python: 'https://www.python.org/',
		fastapi: 'https://fastapi.tiangolo.com/',
		azure: 'https://azure.microsoft.com/',
		msal: 'https://learn.microsoft.com/entra/identity-platform/msal-overview',
		cosmosdb: 'https://azure.microsoft.com/products/cosmos-db/',
		nosql: 'https://en.wikipedia.org/wiki/NoSQL',
		docker: 'https://www.docker.com/',
		tailwindcss: 'https://tailwindcss.com/',
		minecraft: 'https://www.minecraft.net/',
		postgres: 'https://www.postgresql.org/',
		sql: 'https://en.wikipedia.org/wiki/SQL',
		prisma: 'https://www.prisma.io/',
		drizzle: 'https://orm.drizzle.team/',
		sso: 'https://en.wikipedia.org/wiki/Single_sign-on',
		linux: 'https://www.kernel.org/',
		'shadcn-svelte': 'https://www.shadcn-svelte.com/',
		javascript: 'https://developer.mozilla.org/docs/Web/JavaScript'
	};
</script>

{#snippet tag(tag: string)}
	<li
		class:text-orange-500={tag === 'svelte' || tag === 'sveltekit'}
		class:text-cyan-500={tag === 'python'}
		class:text-blue-400={tag === 'azure' || tag === 'msal' || tag === 'cosmosdb'}
		class:text-blue-500={tag === 'docker' || tag === 'gridstack'}
		class:text-teal-500={tag === 'fastapi'}
		class:text-lime-400={tag === 'drizzle'}
		class:text-sky-700={tag === 'postgres'}
		class:text-sky-400={tag === 'tailwindcss'}
		class:text-amber-500={tag === 'closed source'}
		class:text-green-500={tag === 'source available'}
		class="bg-current/5 h-5 rounded-lg border border-current/30 text-xs font-medium whitespace-nowrap"
	>
		{#if tagSites[tag]}
			<a
				href={tagSites[tag]}
				target="_blank"
				rel="noopener noreferrer"
				class="tag-link flex h-full items-center px-1.5">{tag}</a
			>
		{:else}
			<span class="flex h-full items-center px-1.5">{tag}</span>
		{/if}
	</li>
{/snippet}

<div class="grid-cols-2 lg:grid-cols-3 grid gap-4">
	{#each projects as project}
		<article class="bg-current/5 border backdrop-blur-md border-current/20 p-4 pt-3.5 rounded-md">
			<div class="flex items-start justify-between gap-2">
				{#if project.link || project.post}
					<a href={project.link || project.post} target="_blank" class="min-w-0">
						<h3 class="text-lg leading-tight font-semibold">{project.name}</h3>
					</a>
				{:else}
					<h3 class="min-w-0 text-lg leading-tight font-semibold">{project.name}</h3>
				{/if}
				{#if project.source}
					<a href={project.source} target="_blank" class="shrink-0">
						<ul>
							{@render tag('source available')}
						</ul>
					</a>
				{:else}
					<ul class="shrink-0">
						{@render tag('closed source')}
					</ul>
				{/if}
			</div>

			<div class="mt-3">
				{#if project.image}
					<img src={project.image} alt="" class="mb-3 border border-current/20" />
				{/if}
				<p class="text-sm font-light mb-0 text-left">
					{project.description}
					{#if project.post}
						<a href={project.post} class="text-xs text-nowrap">Read More</a>
					{/if}
				</p>
			</div>

			<ul class="flex flex-wrap gap-1 space-y-0.5 mt-3">
				{#each project.tags as tagname}
					{@render tag(tagname)}
				{/each}
			</ul>
		</article>
	{/each}
</div>

<style>
	a.tag-link,
	a.tag-link:visited,
	a.tag-link:hover {
		color: inherit;
		cursor: help;
		text-decoration: none;
	}
</style>

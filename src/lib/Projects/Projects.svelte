<script lang="ts">
	import { projects } from './projects';
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
		class:text-green-500={tag === 'open source'}
		class="bg-current/5 h-5 rounded-lg border border-current/30 px-1.5 py-0.5 text-xs font-medium whitespace-nowrap"
	>
		{tag}
	</li>
{/snippet}

<div class="grid-cols-2 grid gap-4">
	{#each projects as project}
		<article class="bg-current/5 border backdrop-blur-md border-current/20 p-4 pt-3.5 rounded-md">
			<div class="flex justify-between">
				{#if project.link}
					<a href={project.link} target="_blank">
						<h3 class="text-lg font-semibold">{project.name}</h3>
					</a>
				{:else}
					<h3 class="text-lg font-semibold">{project.name}</h3>
				{/if}
				{#if project.source}
					<a href={project.source} target="_blank">
						<ul>
							{@render tag('open source')}
						</ul>
					</a>
				{:else}
					<ul>
						{@render tag('closed source')}
					</ul>
				{/if}
			</div>

			<div class="mt-1">
				<p class="text-sm font-light mb-0 text-left">
					{project.description}
					<a href={project.post} class="text-xs text-nowrap">Read More</a>
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

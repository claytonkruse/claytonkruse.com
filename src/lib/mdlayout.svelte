<script lang="ts">
	let { children, title, subtitle, date, description } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="author" content="Clayton Kruse" />
	<meta name="description" content={description} />
</svelte:head>

<div class="prose max-w-2xl">
	<hgroup>
		<h1 class="text-balance">{title}</h1>
		{#if subtitle}
			<p class="text-balance">{subtitle}</p>
		{/if}

		<p class="mt-2 !text-sm italic text-zinc-400 opacity-50">{date}</p>
	</hgroup>

	{@render children()}
</div>

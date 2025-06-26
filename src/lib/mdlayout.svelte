<script lang="ts">
	let { children, title, subtitle, date, description } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="author" content="Clayton Kruse" />
	<meta name="description" content={description} />
</svelte:head>

<div class="prose max-w-xl">
	<hgroup>
		<h1 class="">{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
		<p class="!text-sm italic !leading-3 opacity-30">{date}; Clayton Kruse</p>
	</hgroup>

	{@render children()}
</div>

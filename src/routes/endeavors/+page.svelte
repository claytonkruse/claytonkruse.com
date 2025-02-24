<script lang="ts">
	import meme from './startup_idea.webp';
</script>

<svelte:head>
	<title>My Endeavors - Clayton Kruse</title>
	<meta
		name="description"
		content="Here is a list of my projects and endeavors."
	/>
	<meta name="keywords" content="endeavors, endeavours, projects" />
</svelte:head>

<div class="text-center">
	<div class="m-auto max-w-fit">
		<h1 class="border-b-[1px] border-b-zinc-800 text-4xl">My Endeavors</h1>
		<nav>
			<ul class="list-none p-0">
				<li>
					<a href="https://toolbox.clayk.cc/to/"
						>Free & Unlimited Image Converter</a
					>
				</li>
				<li>
					<a href="https://minewolf.net/">Minecraft Server List Platform</a>
				</li>
				<li><a href="https://survival.minewolf.net/">Minecraft Server</a></li>
			</ul>
		</nav>
	</div>

	<br />

	<img
		src={meme}
		alt="Meme"
		class="max-w-xl transition-all ease-in-out hover:scale-105"
	/>

	<br />

	<p class="text-sm opacity-50">
		Also see my <a href="/work-history/">work history</a>.
	</p>
</div>

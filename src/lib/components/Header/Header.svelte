<script lang="ts">
	import Twitter from '~icons/prime/twitter';
	import LinkedIn from '~icons/akar-icons/linkedin-box-fill';
	import Github from '~icons/akar-icons/github-fill';
</script>

<header
	class="flex flex-wrap justify-center gap-x-4 border-b-[1px] border-b-zinc-800 border-opacity-35 px-2 font-serif uppercase shadow-md backdrop-blur-[2.5px]"
>
	<nav class="left-5 h-full sm:absolute">
		<a href="/">
			<img
				src="/favicon.png"
				alt="Home"
				class="w-10 align-baseline shadow-2xl"
			/>
		</a>
	</nav>
	<nav>
		<ul
			class="gap-x-4 text-balance text-center [&>li:not(:last-child)]:mr-2 [&>li]:inline-block"
		>
			<li class="grower"><a href="/">Home</a></li>
			<li class="grower"><a href="/about/">About</a></li>
			<li class="grower"><a href="/endeavors/">Endeavors</a></li>
			<li class="grower"><a href="/articles/">Articles</a></li>
		</ul>
	</nav>

	<nav class="right-5 h-full sm:absolute">
		<ul class="flex gap-2">
			<li class="grower">
				<a
					rel="nofollow noopener"
					target="_blank"
					href="/github/"
					aria-label="GitHub"><Github class="translate-y-[3px]" /></a
				>
			</li>
			<li class="grower">
				<a
					rel="nofollow noopener"
					target="_blank"
					href="/x/"
					aria-label="X (Twitter)"><Twitter class="translate-y-[3px]" /></a
				>
			</li>
			<li class="grower">
				<a
					rel="nofollow noopener"
					target="_blank"
					href="/in/"
					aria-label="LinkedIn"><LinkedIn class="translate-y-[3px]" /></a
				>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	ul {
		@apply list-none justify-center p-0;
	}
	li a {
		@apply block text-nowrap py-2;
	}

	.grower {
		@apply font-bold tracking-wider transition-transform hover:scale-110;
	}
</style>

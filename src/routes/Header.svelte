<script lang="ts">
	import Twitter from '~icons/prime/twitter';
	import LinkedIn from '~icons/akar-icons/linkedin-box-fill';
	import Github from '~icons/akar-icons/github-fill';
</script>

<header
	class="flex flex-wrap justify-center gap-x-4 border-b-[1px] border-b-zinc-800 px-2 font-serif uppercase"
>
	<nav class="left-5 h-full sm:absolute">
		<a href="/">
			<img src="/favicon.png" alt="Home" class="w-10 align-baseline" />
		</a>
	</nav>
	<nav>
		<ul
			class="gap-x-4 text-balance text-center [&>li:not(:last-child)]:mr-2 [&>li]:inline-block"
		>
			<li><a href="/">Home</a></li>
			<li><a href="/endeavors/">Endeavors</a></li>
			<li><a href="/work-history/">Work History</a></li>
			<li>
				<a
					target="_blank"
					rel="noopener"
					href="https://docs.google.com/document/d/1AG8CuXm4aywkYa64X6YMXsYvHeYMeeVzwqDuenn1hZ8/edit?usp=sharing"
					>Resume</a
				>
			</li>
			<!-- <li><a href="/friends/">Friends</a></li> -->
			<li><a href="/articles/">Articles</a></li>
			<li><a href="/contact/">Contact</a></li>
		</ul>
	</nav>
	<nav class="right-5 h-full sm:absolute">
		<ul class="flex gap-2">
			<li>
				<a
					rel="nofollow noopener"
					target="_blank"
					href="/github/"
					aria-label="GitHub"><Github class="translate-y-[3px]" /></a
				>
			</li>
			<li>
				<a
					rel="nofollow noopener"
					target="_blank"
					href="/x/"
					aria-label="X (Twitter)"><Twitter class="translate-y-[3px]" /></a
				>
			</li>
			<li>
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
</style>

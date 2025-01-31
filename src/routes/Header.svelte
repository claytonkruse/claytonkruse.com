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
		<ul class="gap-x-4">
			<li><a href="/endeavors/">Endeavors</a></li>
			<li><a href="/work-history/">Work History</a></li>
			<li><a href="/resume/">Resume</a></li>
			<!-- <li><a href="/friends/">Friends</a></li> -->
			<li><a href="/articles/">Articles</a></li>
			<li><a href="/contact/">Contact</a></li>
		</ul>
	</nav>
	<nav class="right-5 h-full sm:absolute">
		<ul class="gap-2">
			<li>
				<a href="/github/" aria-label="GitHub"
					><Github class="translate-y-[3px]" /></a
				>
			</li>
			<li>
				<a href="/x/" aria-label="X (Twitter)"
					><Twitter class="translate-y-[3px]" /></a
				>
			</li>
			<li>
				<a href="/in/" aria-label="LinkedIn"
					><LinkedIn class="translate-y-[3px]" /></a
				>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	ul {
		@apply flex list-none flex-wrap justify-center p-0;
	}
	li a {
		@apply block text-nowrap py-2;
	}
	header a {
		@apply text-zinc-100;
	}
</style>

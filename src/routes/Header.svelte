<header
	class="justify-center border-b-[1px] border-b-zinc-800 font-serif uppercase md:flex md:px-0"
>
	<nav class="left-5 h-full md:absolute">
		<a href="/">
			<img src="/favicon.png" alt="Home" class="w-10 align-baseline" />
		</a>
	</nav>
	<nav>
		<ul>
			<li><a href="/resume/">Resume</a></li>
			<li><a href="/work-history/">Work History</a></li>
			<li><a href="/contact/">Contact</a></li>
		</ul>
	</nav>
	<nav class="right-5 md:absolute">
		<ul>
			<li><a href="/friends/">Friends</a></li>
			<li><a href="/articles/">Articles</a></li>
			<li><a href="/endeavors/">Endeavors</a></li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	ul {
		@apply flex list-none gap-3 p-0;
	}
	li a {
		@apply block text-nowrap py-2;
	}
	header a {
		@apply text-zinc-100;
	}
</style>

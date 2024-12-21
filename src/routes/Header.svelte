<script lang="ts">
	import TwitterIcon from '~icons/prime/twitter';
	import LinkedInIcon from '~icons/akar-icons/linkedin-box-fill';
</script>

<header
	class="justify-center border-b-[1px] border-b-zinc-800 font-serif uppercase md:flex md:px-0"
>
	<nav class="left-5 h-full md:absolute">
		<a href="/">
			<img src="/favicon.png" alt="Home" class="w-10 align-baseline" />
		</a>
	</nav>
	<nav>
		<ul class="gap-4">
			<li><a href="/work-history/">Work History</a></li>
			<li><a href="/resume/">Resume</a></li>
			<!-- <li><a href="/friends/">Friends</a></li> -->
			<li><a href="/articles/">Articles</a></li>
			<li><a href="/endeavors/">Endeavors</a></li>
			<li><a href="/contact/">Contact</a></li>
		</ul>
	</nav>
	<nav class="right-5 h-full md:absolute">
		<ul class="gap-2">
			<li>
				<a href="/x/"><TwitterIcon class="translate-y-[3px]" /></a>
			</li>
			<li>
				<a href="/in/"><LinkedInIcon class="translate-y-[3px]" /></a>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	ul {
		@apply flex list-none p-0;
	}
	li a {
		@apply block text-nowrap py-2;
	}
	header a {
		@apply text-zinc-100;
	}
</style>

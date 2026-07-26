<script lang="ts">
	import LinkedIn from '~icons/akar-icons/linkedin-box-fill';
	import GitHub from '~icons/akar-icons/github-fill';
</script>

<header class="shadow-lg">
	<div
		class="flex flex-wrap justify-center lowercase gap-x-4 border-b border-b-zinc-800/35 px-2 font-mono backdrop-blur-sm"
	>
		<nav>
			<ul class="flex gap-x-4 text-balance text-center">
				<li class="scale-110 font-mono font-semibold text-green-600">
					<a href="/">//clayk.cc/</a>
				</li>
			</ul>
		</nav>

		<nav>
			<ul class="flex gap-x-4 text-balance font-light text-center">
				<li class="hover:text-green-700"><a href="/">Home</a></li>
				<li class="hover:text-green-700"><a href="/#projects">Projects</a></li>
				<li class="hover:text-green-700"><a href="/writings/">Blog</a></li>
				<li class="hover:text-green-700"><a href="/work-history/">Experience</a></li>
				<li class="hover:text-green-700">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://docs.google.com/document/d/1AG8CuXm4aywkYa64X6YMXsYvHeYMeeVzwqDuenn1hZ8/edit?usp=sharing"
						>Resume</a
					>
				</li>
			</ul>
		</nav>

		<nav class="right-5 h-full xl:absolute">
			<ul class="flex gap-2">
				<li class="hover:text-green-700">
					<a rel="nofollow noopener" target="_blank" href="/github/" aria-label="GitHub"
						><GitHub class="translate-y-[3px]" /></a
					>
				</li>

				<li class="hover:text-green-700">
					<a rel="nofollow noopener" target="_blank" href="/in/" aria-label="LinkedIn"
						><LinkedIn class="translate-y-[3px]" /></a
					>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	@reference '../../../routes/style.css';

	ul {
		@apply list-none justify-center p-0;
	}
	li a {
		@apply block text-nowrap py-2;
	}
</style>

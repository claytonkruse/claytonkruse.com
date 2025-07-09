<script lang="ts">
	import Twitter from '~icons/prime/twitter';
	import LinkedIn from '~icons/akar-icons/linkedin-box-fill';
	import Github from '~icons/akar-icons/github-fill';
</script>

<header class="shadow-lg">
	<div
		class="flex flex-wrap justify-center gap-x-4 border-b-[1px] border-b-zinc-800 border-opacity-35 px-2 font-serif uppercase shadow-inner shadow-zinc-700 backdrop-blur-[2.5px]"
	>
		<nav class="left-5 sm:absolute">
			<ul class="flex gap-x-4 text-balance text-center">
				<li class="scale-110 font-mono font-medium lowercase text-green-600">
					<a href="/">//clayk.cc/</a>
				</li>
			</ul>
		</nav>

		<nav>
			<ul class="flex gap-x-4 text-balance text-center">
				<li class="hover:text-green-700"><a href="/">Home</a></li>
				<li class="hover:text-green-700">
					<a href="/endeavors/">Endeavors</a>
				</li>
				<li class="hover:text-green-700"><a href="/writings/">Writings</a></li>
			</ul>
		</nav>

		<nav class="right-5 h-full sm:absolute">
			<ul class="flex gap-2">
				<li class="hover:text-green-700">
					<a
						rel="nofollow noopener"
						target="_blank"
						href="/github/"
						aria-label="GitHub"><Github class="translate-y-[3px]" /></a
					>
				</li>

				<li class="hover:text-green-700">
					<a
						rel="nofollow noopener"
						target="_blank"
						href="/x/"
						aria-label="X (Twitter)"><Twitter class="translate-y-[3px]" /></a
					>
				</li>

				<li class="hover:text-green-700">
					<a
						rel="nofollow noopener"
						target="_blank"
						href="/in/"
						aria-label="LinkedIn"><LinkedIn class="translate-y-[3px]" /></a
					>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style lang="postcss">
	ul {
		@apply list-none justify-center p-0;
	}
	li a {
		@apply block text-nowrap py-2;
	}
</style>

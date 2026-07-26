<script lang="ts">
	let techs = [
		'Docker',

		'C',
		'Java',
		'Java<wbr>Script',
		'Type<wbr>Script',
		'Python',

		'Neo<wbr>vim',

		'Svelte',
		'Svelte<wbr>Kit',
		'Tailwind<wbr>CSS',

		'SQL',
		'Postgres',
		'Drizzle<wbr>ORM',
		'Prisma',

		'Auth',
		'SSO',
		'CAPCHA',

		'Cloudflare Turnstile',

		'HTTP',
		'Networking',
		'Firewall',

		'Tailscale',

		'Vercel',
		'Linode',
		'Hetzner',
		'Heroku',

		'Linux',
		'Debian',
		'Ubuntu',
		'Arch Linux',
		'Endeavour<wbr>OS'
	].sort();

	import Projects from '$lib/Projects/Projects.svelte';
</script>

<svelte:head>
	<title>Clayton Kruse // Computer Science // Projects</title>
	<meta
		name="description"
		content="Welcome to Clayton Kruse's personal website. Hello, this is Clayton. I am Computer Science Major at Mizzou."
	/>
	<meta name="keywords" content="clayton, kruse, computer, computers, tech, technology, anime" />
</svelte:head>

<hgroup class="text-center font-serif">
	<h1 class="font-serif text-5xl tracking-wider">Clayton Kruse</h1>
	<p>I am a senior Computer Science Major at Mizzou.</p>
</hgroup>

<div class="w-[700px] mt-6 text-justify">
	<h3 id="projects">Projects</h3>
	<div class="m-auto max-w-fit">
		<Projects />
	</div>
	<p class="mt-4 text-center text-sm text-gray-400">
		Also see my <a href="/work-history/">Work History</a>.
	</p>

	<br />
	<h3>Skills</h3>
	<div class="columns-[6rem] text-base/5 [&>*]:mb-2">
		{#each techs as tech}
			<div><span class="inline-block">{@html tech}</span></div>
		{/each}
	</div>
	<br />

	<h3>Interests</h3>
	<ul class="list-disc pl-6">
		<li>A.I. & Machine Learning</li>
		<li>Brain Computer Interface Tech</li>
		<li>Augmented Reality (A.R.)</li>
		<li>Virtual Reality (V.R.)</li>
		<li>Innovative operating systems</li>
		<li>Computer physics simulations</li>
		<li>Web dev</li>
	</ul>
</div>

<style>
	@reference './style.css';

	h3 {
		@apply m-auto mb-4 w-min border-b-4 border-double border-green-700 px-[0.3em] text-center text-xl uppercase leading-none tracking-[0.2em] decoration-green-700 decoration-double decoration-1;
		@apply pl-[0.5em]; /* compensates for the tracking on the last letter; tell me if you know a better way to do this. */
	}

	p:not(:last-child) {
		@apply mb-4;
	}
</style>

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
</script>

<svelte:head>
	<title>Clayton Kruse - Computer Science Student</title>
	<meta
		name="description"
		content="Welcome to Clayton Kruse's personal website. Hello, this is Clayton. I am Computer Science Major at Mizzou."
	/>
	<meta
		name="keywords"
		content="clayton, kruse, computer, computers, tech, technology, anime"
	/>
</svelte:head>

<hgroup class="text-center font-serif">
	<h1 class="font-serif text-5xl tracking-wider">Clayton Kruse</h1>
	<p>
		Hey, I'm Clayton. I am a Computer Science Major at The University of
		Missouri, Columbia.
	</p>
</hgroup>

<br />

<div class="max-w-2xl text-justify">
	<h3>Links</h3>
	<nav>
		<ul class="text-center">
			<li>
				<a
					href="https://docs.google.com/document/d/1AG8CuXm4aywkYa64X6YMXsYvHeYMeeVzwqDuenn1hZ8/edit?usp=sharing"
					>Resume</a
				>
			</li>
			<li>
				<a href="/github/">GitHub</a>
			</li>
			<li>
				<a href="/in/">LinkedIn</a>
			</li>
		</ul>
	</nav>

	<br />
	<h3>Skills</h3>
	<div class="columns-[6rem] text-base/5 [&>*]:mb-2">
		{#each techs as tech}
			<div><span class="inline-block">{@html tech}</span></div>
		{/each}
	</div>
	<br />

	<h3>Interests</h3>
	<ul class="list-disc">
		<li>A.I. & Machine Learning (M.L.)</li>
		<li>Finance</li>
		<li>Brain Computer Interface (B.C.I.) Technology</li>
		<li>Augmented Reality Technology (A.R.)</li>
		<li>Virtual Reality Technology (V.R.)</li>
		<li>Using Linux (or B.S.D.) based operating systems.</li>
		<li>Computer Physics Simulations</li>
		<li>Web Development</li>
	</ul>
</div>

<style lang="postcss">
	h3 {
		@apply m-auto mb-4 w-min border-b-4 border-double border-green-700 px-2 text-center text-xl uppercase leading-none tracking-[0.2em] decoration-green-700 decoration-double decoration-1;
	}

	p:not(:last-child) {
		@apply mb-4;
	}
</style>

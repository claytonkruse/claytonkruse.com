<script lang="ts">
	let techs = [
		'Docker',
		'Docker Compose',

		'C',
		'Java',
		'Java<wbr>Script',
		'Type<wbr>Script',

		'Neo<wbr>vim',

		'Svelte',
		'Svelte<wbr>Kit',
		'Tailwind<wbr>CSS',

		'SQL',
		'Postgres',
		'Drizzle',
		'Prisma',
		'Lucia',

		'Caddy Server',

		'Linode VPS',
		'Vercel',

		'Linux',
		'Debian',
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
	<h3>Skills</h3>
	<div class="columns-[6rem] text-base/5 [&>*]:mb-2">
		{#each techs as tech}
			<div><span class="inline-block">{@html tech}</span></div>
		{/each}
	</div>
	<br />

	<h3>Hobbies</h3>
	<p>
		I started programing games on <a href="https://scratch.mit.edu">Scratch</a> in
		elementary school. Inspired to program at an early age, I continued on to create
		numerous projects on the platform that far exceeded the scope of Scratch. These
		projects required complex understanding of Algebra, Trigonometry, and Physics.
	</p>
	<p>
		In middle school, I spent a lot of time working with JavaScript and Node.JS.
		First, I made a basic realtime updating chat application with <a
			href="https://socket.io/">Socket.IO</a
		>
		and <a href="https://expressjs.com/">Express</a>. I contiuned on to make an
		online multiplayer browser game using the same libraries, hosted on
		<a href="https://www.heroku.com/">Heroku</a>. I ran a small flash games
		website that was used by many students in the school. I also started hosting
		a Minecraft server that is still online to this day.
	</p>
	<p>
		In high school, I built multiple computers for my family, my friends, and
		myself. I created a Discord bot via <a href="https://discord.js.org/"
			>Discord.JS</a
		>. This bot also included a frontend written in
		<a href="https://react.dev/">React</a> and had persistent functionality that
		I achieved with <a href="https://www.mongodb.com/">MongoDB</a> and
		<a href="https://mongoosejs.com/">Mongoose</a>. I also wrote a HTML proxy
		from scratch in JavaScript, before I realized there are easier solutions to
		bypass a blocklist.
	</p>
	<p>
		I also made the switch from Windows to Unix-like operating systems in high
		school. I fiddled around with different Linux distributions until I settled
		on <a href="https://archlinux.org/">Arch</a>. I also run some Linux machines
		at home, for personal self-hosted applications.
	</p>
	<p>
		In college, so far I have been working on multiple web applications in <a
			href="https://kit.svelte.dev/">SvelteKit</a
		>. These applications have and
		<a href="https://www.postgresql.org/">PostgreSQL</a>
		databases. These applications also include authentication functionality that
		I wrote myself.
	</p>
</div>

<style lang="postcss">
	h3 {
		@apply m-auto mb-4 w-min border-b-4 border-double border-green-700 px-2 text-center text-xl uppercase leading-none tracking-[0.2em] decoration-green-700 decoration-double decoration-1;
	}

	p:not(:last-child) {
		@apply mb-4;
	}
</style>

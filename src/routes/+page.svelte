<script lang="ts">
	let techs = [
		'Docker',
		'Docker Compose',

		'C',
		'Java',
		'JavaScript',
		'TypeScript',

		'Neovim',

		'Svelte',
		'SvelteKit',
		'TailwindCSS',

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
		'EndeavourOS'
	].sort();
</script>

<svelte:head>
	<title>Clayton Kruse</title>
</svelte:head>

<hgroup>
	<h1 class="font-serif text-4xl">Clayton Kruse</h1>
	<h2>Hello, I am a full time student of Computer Science at Mizzou.</h2>
</hgroup>

<h2>Skills</h2>
<div class="mb-5 grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5">
	{#each techs as tech}
		<div>{tech}</div>
	{/each}
</div>

<h2>Hobbies</h2>
<p>
	I started programing games on <a href="https://scratch.mit.edu">Scratch</a> in
	elementary school. Inspired to program at an early age, I continued on to create
	numerous projects on the platform that far exceeded the scope of Scratch. These
	projects required complex understanding of Algebra, Trigonometry, and Physics.
	I did all of my programming in Scratch until I moved on in middle school.
</p>
<p>
	In middle school, I spent a lot of time working with JavaScript and Node.JS.
	First, I made a basic realtime updating chat application with <a
		href="https://socket.io/">Socket.IO</a
	>
	and <a href="https://expressjs.com/">Express</a>. I contiuned on to make an
	online multiplayer browser game using the same libraries, hosted on
	<a href="https://www.heroku.com/">Heroku</a>. I ran a small flash games
	website that was used by many students in the school. I also started hosting a
	Minecraft server that is still online to this day.
</p>
<p>
	In high school, I built multiple computers for my family, my friends, and
	myself. I created a Discord bot via <a href="https://discord.js.org/"
		>Discord.JS</a
	>. This bot also included a frontend written in
	<a href="https://react.dev/">React</a> and had persistent functionality that I
	achieved with <a href="https://www.mongodb.com/">MongoDB</a> and
	<a href="https://mongoosejs.com/">Mongoose</a>. I also wrote a HTML proxy from
	scratch in JavaScript, before I realized there are easier solutions to bypass
	a blocklist.
</p>
<p>
	I also made the switch from Windows to Unix-like operating systems in high
	school. I fiddled around with different Linux distrobutions until I settled on <a
		href="https://archlinux.org/">Arch</a
	>. I also run some Linux boxes at home, for personal self-hosted applications.
</p>
<p>
	In college, so far I have been working on multiple web applications in <a
		href="https://kit.svelte.dev/">SvelteKit</a
	>. These applications have
	<a href="https://www.sqlite.org/index.html">SQLite</a>
	and <a href="https://www.postgresql.org/">PostgreSQL</a> databases that I
	interact with through <a href="https://orm.drizzle.team/">Drizzle</a>. These
	applications also include authentication functionality that I initally wrote
	myself; however, I have migrated to
	<a href="https://lucia-auth.com/">Lucia</a>.
</p>

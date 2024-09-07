<script lang="ts">
	let techs = [
		'PocketBase',

		'Docker',
		'Docker Compose',

		'C',
		'Java',
		'JavaScript',
		'TypeScript',
		'Go',
		'Lua',
		'Python',
		'C#',

		'Bash',
		'ssh',
		'Vim',
		'Neovim',
		'VSCode',
		'VSCodium',

		'Node.js',
		'Express',
		'Axios',
		'Socket.IO',
		'Discord.JS',

		'React',
		'Svelte',
		'SvelteKit',
		'TailwindCSS',

		'SQL',
		'MySQL',
		'SQLite',
		'Postgres',
		'Drizzle',
		'Prisma',
		'Lucia',

		'MongoDB',
		'Mongoose',

		'PHP',
		'Apache',
		'Caddy',

		'Heroku',
		'Linode',
		'Vercel',

		'Windows',

		'GNU/Linux',
		'Debian',
		'Ubuntu',
		'Ubuntu Server',
		'LinuxMint',
		'Fedora',
		'Arch Linux',
		'EndeavourOS',

		'Gnome',
		'KDE Plasma',
		'Xfce',
		'i3wm',

		'Ventoy',

		'Jellyfin',
		'Plex'
	].sort();
</script>

<svelte:head>
	<title>Clayton Kruse</title>
</svelte:head>

<hgroup>
	<h1 class="font-serif text-4xl">Clayton Kruse</h1>
	<h2>Hello, I am a full time student of Computer Science at Mizzou.</h2>
</hgroup>

<h2>University Education at Mizzou</h2>
<p>
	On my first day of class at Mizzou, I walked into CS 1050, sat down, and was
	bewildered by how basic the material was. After the class ended, I immediately
	contacted my Academic Advisor and asked him about potentially skipping the
	class for something more advanced. He informed me of a policy that would allow
	me to skip CS 1050, while still receiving credit for it, under the condition
	that I get above a B in the more advanced class, CS 2050. It's now the spring
	semester, and I have successfully received credit for both CS 1050 and 2050
	with a cumulative GPA of 3.44 for the fall semester.
</p>

<h2>Technologies I have Experience With</h2>
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
	<a href="https://mongoosejs.com/">Mongoose</a>. I also wrote HTML proxies from
	scratch, before I realized there are easier solutions to bypass a blocklist.
</p>
<p>
	I also made the switch from Windows to Unix-like operating systems in high
	school. I fiddled around with different Linux distrobutions until I settled on <a
		href="https://archlinux.org/">Arch</a
	>. I also run some Linux boxes at home, which I use for
	<a href="https://jellyfin.org/">Jellyfin</a> and as a NAS.
</p>
<p>
	In college, so far I have been working on multiple web applications in <a
		href="https://kit.svelte.dev/">SvelteKit</a
	>. These applications have
	<a href="https://www.sqlite.org/index.html">SQLite</a>
	and <a href="https://www.postgresql.org/">PostgreSQL</a> databases that I
	interact with through <a href="https://www.prisma.io/">Prisma</a>. These
	applications also include authentication functionality that I initally wrote
	myself; however, I have migrated to
	<a href="https://lucia-auth.com/">Lucia</a>.
</p>

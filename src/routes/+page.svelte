<script lang="ts">
	const techs = [
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
		'Discord.js',

		'React',
		'Svelte',
		'SvelteKit',

		'SQL',
		'MySQL',
		'SQLite',
		'PostgreSQL',
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
		'Windows Administration',
		'Windows Network Administration',
		'DOS Shell',

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
	];
</script>

<svelte:head>
	<title>Clayton Kruse</title>
	<meta name="author" content="Clayton Kruse" />
</svelte:head>

<h1 class="font-serif">Clayton Kruse</h1>
<p>
	Hello, I am a full time Computer Science student at Mizzou, who was able to
	skip CS 1050 for CS 2050 with a cumulative GPA of 3.44 in my first semseter,
	and I am looking for summer internship opportunities.
</p>
<h2>Contact Me</h2>
<table>
	<tr>
		<td>Email</td>
		<td>
			<a href="mailto:claytonkruse08@gmail.com">claytonkruse08@gmail.com</a>
		</td>
	</tr>
	<tr>
		<td>Phone</td>
		<td>
			<a href="tel:+13147452624">(314) 745-2624</a>
		</td>
	</tr>
</table>

<h2>Education</h2>
<p>In high school I took a number of classes related to computer science.</p>
<ul>
	<li>
		High School Classes
		<ul>
			<li>Intro to Programming</li>
			<li>
				AP Computer Science
				<ul>
					<li>OOP & Inheritence</li>
				</ul>
			</li>
			<li>
				Web Development
				<ul>
					<li>Learned PHP</li>
					<li>Learned SQL with <a href="https://www.mysql.com/">MySQL</a></li>
				</ul>
			</li>
			<li>
				Networking
				<ul>
					<li>IP</li>
					<li>Windows Network Administration</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>
		Awarded for Highest Innovation at Missouri S&T Summer Pre-Decision Visit
	</li>
</ul>
<h3>University Education at Mizzou</h3>
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
<div class="grid">
	{#each techs as tech}
		<div>{tech}</div>
	{/each}
</div>

<h2>Related Projects and Hobbies</h2>
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

<h2>Employment Experience</h2>
<p>I have been formally employed by businesses on two separate occasions.</p>
<p>
	My first job was working part time at Dairy Queen in the back, which was known
	as the grill. I prepared all the hot food at that location. My
	responsibilities included managing a grill, multiple fryers, multiple
	microwaves, two ovens, and the freezer. I always worked the closing shift, so
	at the end of the night, I would do all the dishes, clean the grill and the
	fryers, take the grease out back behind the dumpster and pour it into the
	receptacal, clean all surfaces including the insides of the microwaves, take
	out the trash, and finally mop the floors.
</p>
<p>
	My second job was working full time at Dierberg's in the Deli department. This
	job was much the same as working at Dairy Queen. Both jobs had lots of hard
	work preparing food, cleaning, and working the closing shift. The difference
	with Dierberg's was that I was now working full time while still attending
	school, and in a position where I had to both provide customer service, and
	functionally work as a team with my co-workers, which was in stark contrast to
	the solitude of Dairy Queen. During my time at Dierberg's, I was also in
	charge of training new part-time hires.
</p>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.2em;
		margin-bottom: 1em;
	}
</style>

import ih8webp from '$lib/assets/ihatewebp.png';
import burnsmcdav from '$lib/assets/burnsmcdav.jpg';

export const projects = [
	{
		name: 'A&F Project Portal',
		// post: '/writings/burnsmcd-anf-project-portal/',
		description:
			'The Burns & McDonnell Aviation & Federal Project Portal is a platform I spearheaded the development of as Project Lead during my internship at the firm.',
		tags: [
			'svelte',
			'sveltekit',
			'gridstack',
			'python',
			'fastapi',
			'azure',
			'msal',
			'cosmosdb',
			'nosql',
			'docker'
		],
		image: burnsmcdav
	},
	{
		name: 'iHATEWebP',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/',
		source: 'https://github.com/claytonkruse/ihatewebp',
		description:
			'Initially a simple tool to convert WebP images to PNG, which later grew into a full suite of convenient tools for the web.',
		tags: ['svelte', 'tailwindcss'],
		image: ih8webp
	},
	{
		name: 'MINEWOLF',
		// post: '/writings/minewolf/',
		link: 'https://minewolf.net/',
		source: 'https://github.com/claytonkruse/minewolf',
		description:
			'A Minecraft server listing platform with live server info and Votifier integration.',
		tags: [
			'svelte',
			'sveltekit',
			'minecraft',
			'postgres',
			'sql',
			'prisma',
			'drizzle',
			'sso',
			'linux'
		]
	},
	{
		name: 'Password Generator',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/password-generator/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes/password-generator',
		description:
			'A fun and memorable password generator with many options, bells and whistles. A new addition to iHATEWebP.',
		tags: ['svelte', 'shadcn-svelte']
	},
	{
		name: 'Image Transformer',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes',
		description:
			'A set of simple tools to compress, transform, and edit images. This is now part of iHATEWebP.',
		tags: ['svelte', 'javascript']
	},
	{
		name: 'Image Compressor',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/convert/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes/compress',
		description: 'A simple tool to compress images. This is now part of iHATEWebP.',
		tags: ['svelte', 'javascript']
	},
	{
		name: 'Image Converter',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/convert/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes/convert',
		description: 'A simple tool to convert WebP images to PNG. This is now part of iHATEWebP.',
		tags: ['svelte', 'javascript']
	}
];

import imageCompressorPoster from '$lib/assets/image-compressor-poster.webp';
import imageCompressorWebm from '$lib/assets/image-compressor.webm';
import imageCompressorMp4 from '$lib/assets/image-compressor.mp4';
import imageConverterPoster from '$lib/assets/image-converter-poster.webp';
import imageConverterWebm from '$lib/assets/image-converter.webm';
import imageConverterMp4 from '$lib/assets/image-converter.mp4';
import imageTransformerPoster from '$lib/assets/image-transformer-poster.webp';
import imageTransformerWebm from '$lib/assets/image-transformer.webm';
import imageTransformerMp4 from '$lib/assets/image-transformer.mp4';
import ih8webpPoster from '$lib/assets/ihatewebp-poster.webp';
import ih8webpWebm from '$lib/assets/ihatewebp.webm';
import ih8webpMp4 from '$lib/assets/ihatewebp.mp4';
import minewolfPoster from '$lib/assets/minewolf-poster.webp';
import minewolfWebm from '$lib/assets/minewolf.webm';
import minewolfMp4 from '$lib/assets/minewolf.mp4';
import zenTetrisPoster from '$lib/assets/zen-tetris-poster.webp';
import zenTetrisWebm from '$lib/assets/zen-tetris.webm';
import zenTetrisMp4 from '$lib/assets/zen-tetris.mp4';
import canvasCalPoster from '$lib/assets/canvas-cal-poster.webp';
import canvasCalWebm from '$lib/assets/canvas-cal.webm';
import canvasCalMp4 from '$lib/assets/canvas-cal.mp4';
import passwordGenPoster from '$lib/assets/password-generator-poster.webp';
import passwordGenWebm from '$lib/assets/password-generator.webm';
import passwordGenMp4 from '$lib/assets/password-generator.mp4';

// Numbered so the slideshow plays in filename order.
const burnsmcdavSlides = Object.entries(
	import.meta.glob<string>('$lib/assets/burnsmcdav/*.webp', { eager: true, import: 'default' })
)
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([, url]) => url);

export type ProjectVideo = { webm?: string; mp4?: string };

export type Project = {
	name: string;
	post?: string;
	link?: string;
	source?: string;
	description: string;
	tags: string[];
	/** Shown on its own, or as the poster while `video` loads. Ideally the video's first frame. */
	image?: string;
	/** Short, silent, looping clip of the project in use. */
	video?: ProjectVideo;
	/** Images shown as a fading slideshow, for projects that can't be recorded. */
	slides?: string[];
};

export const projects: Project[] = [
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
		slides: burnsmcdavSlides
	},
	{
		name: 'iHATEWebP',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/',
		source: 'https://github.com/claytonkruse/ihatewebp',
		description:
			'Initially a simple tool to convert WebP images to PNG, which later grew into a full suite of convenient tools for the web.',
		tags: ['svelte', 'tailwindcss'],
		image: ih8webpPoster,
		video: { webm: ih8webpWebm, mp4: ih8webpMp4 }
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
		],
		image: minewolfPoster,
		video: { webm: minewolfWebm, mp4: minewolfMp4 }
	},
	{
		name: 'Zen Tetris',
		link: '/zen-tetris/',
		source: 'https://github.com/claytonkruse/claytonkruse.com/tree/master/src/routes/zen-tetris',
		description:
			"Tetris, but you can't lose. When the stack reaches the top, the board just scrolls down and you keep playing.",
		tags: ['svelte', 'javascript'],
		image: zenTetrisPoster,
		video: { webm: zenTetrisWebm, mp4: zenTetrisMp4 }
	},
	{
		name: 'Canvas Cal',
		link: 'https://cal.clayk.cc/?canvasFeed=https%3A%2F%2Fumsystem.instructure.com%2Ffeeds%2Fcalendars%2Fuser_epYWGJ78l90wiUiiFm9GRi0lLlTFK2Fmf61IJ2QY.ics',
		source: 'https://github.com/claytonkruse/cal',
		description:
			'A calendar for your Canvas feed that moves assignment due dates up to where they intuitively belong.',
		tags: ['svelte', 'sveltekit', 'shadcn-svelte', 'tailwindcss', 'ical'],
		image: canvasCalPoster,
		video: { webm: canvasCalWebm, mp4: canvasCalMp4 }
	},
	{
		name: 'Password Generator',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/password-generator/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes/password-generator',
		description:
			'A fun and memorable password generator with many options, bells and whistles. A new addition to iHATEWebP.',
		tags: ['svelte', 'shadcn-svelte'],
		image: passwordGenPoster,
		video: { webm: passwordGenWebm, mp4: passwordGenMp4 }
	},
	{
		name: 'Image Transformer',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes',
		description:
			'A set of simple tools to compress, transform, and edit images. This is now part of iHATEWebP.',
		tags: ['svelte', 'javascript'],
		image: imageTransformerPoster,
		video: { webm: imageTransformerWebm, mp4: imageTransformerMp4 }
	},
	{
		name: 'Image Compressor',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/compress/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes/compress',
		description: 'A simple tool to compress images. This is now part of iHATEWebP.',
		tags: ['svelte', 'javascript'],
		image: imageCompressorPoster,
		video: { webm: imageCompressorWebm, mp4: imageCompressorMp4 }
	},
	{
		name: 'Image Converter',
		// post: '/writings/ihatewebp/',
		link: 'https://ihatewebp.com/convert/',
		source: 'https://github.com/claytonkruse/ihatewebp/tree/master/src/routes/convert',
		description: 'A simple tool to convert WebP images to PNG. This is now part of iHATEWebP.',
		tags: ['svelte', 'javascript'],
		image: imageConverterPoster,
		video: { webm: imageConverterWebm, mp4: imageConverterMp4 }
	}
];

import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

const sites = [
	'https://imgops.com/',
	'https://ihatewebp.com/',
	'https://ih8webp.com/',
	'https://llerrah.com/cattrapgame1.htm',
	'https://theindex.moe/',
	'https://catbox.moe/',
	'https://cock.li/',
	'https://instant.io/',
	'https://wormhole.app/',
	'https://www.photopea.com/',
	'https://quickpic.t3.gg/',
	'https://lukesmith.xyz/',
	'https://landchad.net/',
	'https://adguard-dns.io/en/public-dns.html',
	'https://excalidraw.com/',
	'https://cobalt.tools/remux',
	'http://www.senchalabs.org/philogl/PhiloGL/examples/worldFlights/',
	'https://therandombutton.github.io/random.html', // another random site
	'https://scratch.mit.edu/projects/389464290/',
	'https://paint.toys/zen-garden/',
	'https://huntabyte.com/',
	'https://minewolf.net/',
	'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	'https://www.youtube.com/watch?v=B_hQGYciGy0',
	'https://www.youtube.com/watch?v=6Dip4alT63U',

	// people
	'https://austinwarnock.tech/',
	'https://alexheinking.com/',
	'https://lrnewsom.github.io/'
];

export const load: PageServerLoad = () => {
	redirect(307, sites[Math.floor(Math.random() * sites.length)]);
};

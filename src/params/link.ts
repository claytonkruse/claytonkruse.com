import type { ParamMatcher } from '@sveltejs/kit';

type Link = {
	names: Array<string>;
	url: string;
};

export const links: Array<Link> = [
	{
		names: ['github'],
		url: 'https://github.com/claytonkruse'
	},
	{
		names: ['x', 'twitter'],
		url: 'https://x.com/claytonkruse/'
	},
	{
		names: ['in', 'linkedin'],
		url: 'https://linkedin.com/in/claykruse/'
	}
];

export const match = ((param: string) => {
	for (const link of links) if (link.names.includes(param)) return true;
	console.log('AHHHH');
	return false;
}) satisfies ParamMatcher;

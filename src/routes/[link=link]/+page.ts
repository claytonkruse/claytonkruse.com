import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { links } from '../../params/link';

export const load = (async ({ params }) => {
	const { link: param }: { link: string } = params;
	for (const link of links)
		if (link.names.includes(param)) redirect(301, link.url);
	return false;
}) satisfies PageLoad;

import type { PageServerLoad } from './$types';

export const prerender = true;

const files = import.meta.glob('./*/+page.svx');

export const load: PageServerLoad = async () => {
	const posts = await Promise.all(
		Object.entries(files).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as any;
			const slug = path.slice(2, -10);

			return { slug, ...metadata };
		})
	);

	posts.sort(
		(a, b) =>
			new Date(
				a.date
					.replace('th', '')
					.replace('st', '')
					.replace('nd', '')
					.replace('rd', '')
			).getTime() -
			new Date(
				b.date
					.replace('th', '')
					.replace('st', '')
					.replace('nd', '')
					.replace('rd', '')
			).getTime()
	);
	posts.reverse(); // most recent first

	return { posts };
};

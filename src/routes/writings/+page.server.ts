import { getPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return { posts: await getPosts() };
};

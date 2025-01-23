import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Parser from 'rss-parser';
const parser = new Parser();

export const prerender = false;

let cache: any;
let cacheExpiry: number = Date.now();

export const load: PageServerLoad = async () => {
	if (!cache || Date.now() > cacheExpiry) {
		console.log('Refreshing article cache...');
		cache = await parser
			.parseURL('https://medium.com/feed/@claytonkruse')
			.catch(() => error(429, 'Could not get data from Medium.'));
		cacheExpiry = Date.now() + 900_000; // cache lasts 900 sec (15 min)
		console.log('Got new article cache.');
	}
	const feed = cache;
	return { feed };
};

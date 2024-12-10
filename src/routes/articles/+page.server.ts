import type { PageServerLoad } from './$types';
import Parser from "rss-parser";
const parser = new Parser();

export const load: PageServerLoad = (async () => {
    const feed = await parser.parseURL("https://medium.com/feed/@claytonkruse");
    return { feed };
});


import { getPosts, parsePostDate } from '$lib/posts';

export const prerender = true;
export const trailingSlash = 'ignore';

const SITE = 'https://claytonkruse.com';

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function pubDate(date: string) {
	const parsed = parsePostDate(date);
	const utc = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12));
	return utc.toUTCString();
}

export async function GET() {
	const posts = (await getPosts()).filter((post) => !post.unlisted);

	const items = posts
		.map((post) => {
			const url = `${SITE}/writings/${post.slug}/`;

			return `		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${pubDate(post.date)}</pubDate>
			<description>${escapeXml(post.excerpt)}</description>
		</item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Clayton Kruse</title>
		<link>${SITE}/writings/</link>
		<description>Articles or blogposts written by Clayton Kruse on a variety of topics.</description>
		<language>en</language>
		<atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}

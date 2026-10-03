export type Post = {
	slug: string;
	title: string;
	date: string;
	subtitle?: string;
	description?: string;
	unlisted?: boolean;
	excerpt: string;
};

type PostModule = {
	metadata: Omit<Post, 'slug' | 'excerpt'>;
};

const modules = import.meta.glob('/src/routes/writings/*/+page.svx');
const sources = import.meta.glob('/src/routes/writings/*/+page.svx', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>;

export function parsePostDate(date: string) {
	return new Date(date.replace(/(\d+)(st|nd|rd|th)\b/g, '$1'));
}

function excerptFromSource(source: string) {
	const body = source.replace(/^---[\s\S]*?---/, '').trim();
	const paragraph = body
		.split(/\n\s*\n/)
		.map((block) => block.trim())
		.find((block) => block && !block.startsWith('#'));

	if (!paragraph) return '';

	return paragraph
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

export async function getPosts() {
	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as PostModule;
			const source = await sources[path]();
			const slug = path.split('/').at(-2) ?? '';

			return {
				slug,
				...metadata,
				excerpt: metadata.description || excerptFromSource(source)
			} satisfies Post;
		})
	);

	posts.sort((a, b) => parsePostDate(b.date).getTime() - parsePostDate(a.date).getTime());

	return posts;
}

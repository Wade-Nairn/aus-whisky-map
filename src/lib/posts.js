import { marked } from 'marked';

const raw = import.meta.glob('/src/content/news/*.md', { query: '?raw', import: 'default', eager: true });

function parseFrontmatter(content) {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return { meta: {}, body: content };

	const meta = {};
	for (const line of match[1].split('\n')) {
		const colon = line.indexOf(':');
		if (colon < 1) continue;
		const key = line.slice(0, colon).trim();
		const val = line.slice(colon + 1).trim().replace(/^['"]|['"]$/g, '');
		meta[key] = val;
	}

	return { meta, body: match[2] };
}

export function getAllPosts() {
	return Object.entries(raw)
		.map(([path, content]) => {
			const slug = path.split('/').pop().replace('.md', '');
			const { meta } = parseFrontmatter(content);
			return { slug, ...meta };
		})
		.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
	const path = `/src/content/news/${slug}.md`;
	const content = raw[path];
	if (!content) return null;

	const { meta, body } = parseFrontmatter(content);
	const html = marked(body);
	return { slug, ...meta, html };
}

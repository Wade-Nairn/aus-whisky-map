import { getAllPosts } from '$lib/posts.js';

export const prerender = true;

export function GET() {
	const posts = getAllPosts();
	const base = 'https://auswhiskymap.com';

	const pages = [
		{ url: '/', priority: '1.0', changefreq: 'monthly' },
		{ url: '/news', priority: '0.9', changefreq: 'weekly' },
		...posts.map((p) => ({
			url: `/news/${p.slug}`,
			priority: '0.7',
			changefreq: 'monthly',
			lastmod: p.date
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${base}${p.url}</loc>
    ${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

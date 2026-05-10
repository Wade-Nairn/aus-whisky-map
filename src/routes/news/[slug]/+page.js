import { getPost, getAllPosts } from '$lib/posts.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { post };
}

export function entries() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

<script>
	let { data } = $props();
	const { post } = data;

	function formatDate(str) {
		return new Date(str).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>{post.title} — Aus Whisky Map</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<div class="max-w-2xl mx-auto px-5 py-12">
	<!-- Back link -->
	<a
		href="/news"
		class="inline-flex items-center gap-1.5 text-xs text-warm-400 hover:text-warm-50 transition-colors mb-8"
	>
		<svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		All posts
	</a>

	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center gap-2 mb-4">
			<span class="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-400">
				{post.category}
			</span>
			<span class="text-xs text-warm-400">{formatDate(post.date)}</span>
		</div>
		<h1 class="text-3xl font-semibold text-warm-50 leading-tight" style="font-family: 'Playfair Display', Georgia, serif;">
			{post.title}
		</h1>
		{#if post.excerpt}
			<p class="mt-4 text-warm-400 text-base leading-relaxed border-l-2 border-amber-500/40 pl-4">
				{post.excerpt}
			</p>
		{/if}
	</div>

	<hr class="border-white/8 mb-8" />

	<!-- Article body -->
	<div class="prose">
		{@html post.html}
	</div>
</div>

<style>
	.prose :global(h2) {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 1.35rem;
		font-weight: 600;
		color: #f5f0e8;
		margin-top: 2.5rem;
		margin-bottom: 0.75rem;
	}
	.prose :global(h3) {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 1.1rem;
		font-weight: 600;
		color: #f5f0e8;
		margin-top: 1.75rem;
		margin-bottom: 0.5rem;
	}
	.prose :global(p) {
		color: #c9b99a;
		line-height: 1.8;
		margin-bottom: 1.25rem;
		font-size: 0.9375rem;
	}
	.prose :global(strong) {
		color: #f5f0e8;
		font-weight: 600;
	}
	.prose :global(em) {
		color: #9a8060;
	}
	.prose :global(ul), .prose :global(ol) {
		color: #c9b99a;
		padding-left: 1.5rem;
		margin-bottom: 1.25rem;
	}
	.prose :global(li) {
		line-height: 1.8;
		margin-bottom: 0.25rem;
	}
	.prose :global(hr) {
		border-color: rgba(255,255,255,0.08);
		margin: 2rem 0;
	}
	.prose :global(a) {
		color: #c8860a;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.prose :global(a:hover) {
		color: #f59e0b;
	}
	.prose :global(blockquote) {
		border-left: 2px solid rgba(200, 134, 10, 0.4);
		padding-left: 1rem;
		color: #9a8060;
		font-style: italic;
		margin: 1.5rem 0;
	}
</style>

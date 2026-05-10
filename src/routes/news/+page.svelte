<script>
	let { data } = $props();

	const categories = ['All', ...new Set(data.posts.map((p) => p.category))];
	let activeCategory = $state('All');

	const filtered = $derived(
		activeCategory === 'All' ? data.posts : data.posts.filter((p) => p.category === activeCategory)
	);

	function formatDate(str) {
		return new Date(str).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>News — Aus Whisky Map</title>
	<meta name="description" content="Reviews, guides, and features on Australian whisky." />
</svelte:head>

<div class="max-w-4xl mx-auto px-5 py-12">
	<!-- Page heading -->
	<div class="mb-10">
		<h1 class="text-3xl font-semibold text-warm-50" style="font-family: 'Playfair Display', Georgia, serif;">
			News &amp; Reviews
		</h1>
		<p class="text-warm-400 mt-2 text-sm">Reviews, guides, and features on Australian whisky.</p>
	</div>

	<!-- Category filter -->
	<div class="flex gap-2 mb-8 flex-wrap">
		{#each categories as cat}
			<button
				onclick={() => (activeCategory = cat)}
				class="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
					{activeCategory === cat
						? 'bg-amber-500 border-amber-500 text-surface-900'
						: 'bg-transparent border-white/15 text-warm-200 hover:border-amber-500/50 hover:text-warm-50'}"
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Post list -->
	<div class="flex flex-col divide-y divide-white/5">
		{#each filtered as post (post.slug)}
			<article class="py-7 group">
				<a href="/news/{post.slug}" class="block">
					<div class="flex items-center gap-2 mb-2">
						<span class="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-400">
							{post.category}
						</span>
						<span class="text-xs text-warm-400">{formatDate(post.date)}</span>
					</div>
					<h2 class="text-lg font-semibold text-warm-50 group-hover:text-amber-400 transition-colors leading-snug" style="font-family: 'Playfair Display', Georgia, serif;">
						{post.title}
					</h2>
					<p class="text-sm text-warm-400 mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
					<span class="inline-flex items-center gap-1 mt-3 text-xs text-amber-500 group-hover:text-amber-400 transition-colors">
						Read more
						<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</a>
			</article>
		{/each}

		{#if filtered.length === 0}
			<p class="py-12 text-center text-warm-400 text-sm">No posts in this category yet.</p>
		{/if}
	</div>
</div>

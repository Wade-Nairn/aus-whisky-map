<script>
	import { page } from '$app/stores';
</script>

<header class="sticky top-0 z-50 bg-surface-900/95 backdrop-blur-md border-b border-white/8">
	<div class="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
		<a
			href="/"
			style="font-family: 'Satisfy', cursive; font-size: 1.4rem; color: #c8860a; line-height: 1; text-decoration: none;"
		>
			Aus Whisky Map
		</a>

		<nav class="flex items-center gap-1">
			<a
				href="/"
				class="px-3 py-1.5 rounded-lg text-sm transition-colors
					{$page.url.pathname === '/' ? 'text-warm-50 bg-white/5' : 'text-warm-400 hover:text-warm-50'}"
			>
				Map
			</a>
			<a
				href="/news"
				class="px-3 py-1.5 rounded-lg text-sm transition-colors
					{$page.url.pathname.startsWith('/news') ? 'text-warm-50 bg-white/5' : 'text-warm-400 hover:text-warm-50'}"
			>
				News
			</a>
		</nav>
	</div>
</header>

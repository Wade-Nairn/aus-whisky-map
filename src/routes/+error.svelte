<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Page not found — Aus Whisky Map</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-surface-900 text-warm-50 px-5" style="font-family: 'Inter', system-ui, sans-serif;">
	<div class="text-center max-w-md">
		<!-- Pin icon -->
		<svg class="mx-auto mb-6 opacity-40" width="48" height="72" viewBox="0 0 24 36" fill="none">
			<path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z" fill="#c8860a"/>
			<circle cx="12" cy="12" r="4.5" fill="#0d0d0d"/>
		</svg>

		<p class="text-5xl font-bold text-amber-500 mb-4">{$page.status}</p>

		<h1 class="text-xl font-semibold text-warm-50 mb-3" style="font-family: 'Playfair Display', Georgia, serif;">
			{$page.status === 404 ? 'This page doesn\'t exist' : 'Something went wrong'}
		</h1>

		<p class="text-sm text-warm-400 mb-8 leading-relaxed">
			{$page.status === 404
				? 'The page you\'re looking for has either moved or never existed. Let\'s get you back on the map.'
				: $page.error?.message ?? 'An unexpected error occurred.'}
		</p>

		<div class="flex items-center justify-center gap-4">
			<a
				href="/"
				class="px-5 py-2.5 rounded-lg bg-amber-500 text-surface-900 text-sm font-semibold hover:bg-amber-400 transition-colors"
			>
				Back to the map
			</a>
			<a
				href="/news"
				class="px-5 py-2.5 rounded-lg border border-white/15 text-warm-200 text-sm hover:border-amber-500/50 hover:text-warm-50 transition-colors"
			>
				Browse news
			</a>
		</div>
	</div>
</div>

<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Satisfy&display=swap"
		rel="stylesheet"
	/>
	<!-- Default OG image — individual pages override title/description -->
	<meta property="og:image" content="https://auswhiskymap.com/og-image.svg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://auswhiskymap.com/og-image.svg" />
</svelte:head>

{@render children()}

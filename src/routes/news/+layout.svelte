<script>
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-surface-900 text-warm-50" style="font-family: 'Inter', system-ui, sans-serif;">
	<SiteHeader />
	<main class="flex-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>

<script>
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { sidebarOpen, mapReady } from '$lib/stores/map.js';

	let { data } = $props();
</script>

<svelte:head>
	<title>Australian Whisky Distilleries</title>
	<meta name="description" content="An interactive map of every whisky distillery in Australia. Explore Tasmania, Victoria, New South Wales, Western Australia and beyond." />
	<meta property="og:title" content="Australian Whisky Distilleries" />
	<meta property="og:description" content="Interactive map of every whisky distillery in Australia." />
</svelte:head>

<div class="relative h-screen w-screen overflow-hidden bg-surface-900">
	<Map distilleries={data.distilleries} />

	<!-- Site title — fixed, always visible over the map -->
	<h1
		class="fixed top-4 left-4 z-30 pointer-events-none leading-none"
		style="font-family: 'Satisfy', cursive; font-size: 1.75rem; color: {$mapReady ? '#000' : '#fff'}; text-shadow: 0 1px 8px rgba(255,255,255,0.4); transition: color 0.6s ease;"
	>
		<span style="position: relative; display: inline-block; padding-bottom: 2px;">
			Aus Whisky Map
			<svg
				aria-hidden="true"
				style="position: absolute; bottom: 0; left: 0; width: 100%; height: 10px; overflow: visible; z-index: -1;"
				viewBox="0 0 100 10"
				preserveAspectRatio="none"
			>
				<path d="M 0,10 Q 50,0 100,10" fill="none" stroke="#c8860a" stroke-width="2.5" stroke-linecap="round"/>
			</svg>
		</span>
	</h1>

	<!--
		Sliding container holds both the sidebar and the toggle button.
		Translating the container -360px hides the sidebar off-screen while
		leaving the toggle button visible at x≈0 (360px into container - 360px offset).
	-->
	<div
		class="absolute inset-y-0 left-0 z-20 flex items-start"
		style="transform: translateX({$sidebarOpen ? '0px' : '-376px'}); transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);"
	>
		<!-- Sidebar panel -->
		<div class="relative w-[376px] h-full">
			<Sidebar distilleries={data.distilleries} />
		</div>

		<!-- Toggle button — anchored to the right edge of the sidebar -->
		<button
			onclick={() => sidebarOpen.update((v) => !v)}
			aria-label={$sidebarOpen ? 'Hide distillery list' : 'Show distillery list'}
			class="mt-[4.5rem] ml-2 w-10 h-10 shrink-0 flex items-center justify-center rounded-lg shadow-lg
				   bg-surface-800/90 backdrop-blur-sm border border-white/10
				   text-warm-200 hover:text-warm-50 hover:border-amber-500/40 transition-colors"
		>
			{#if $sidebarOpen}
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<path d="M11 4L6 9l5 5" />
				</svg>
			{:else}
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="3" y1="5" x2="15" y2="5" />
					<line x1="3" y1="9" x2="15" y2="9" />
					<line x1="3" y1="13" x2="15" y2="13" />
				</svg>
			{/if}
		</button>
	</div>
</div>

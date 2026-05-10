<script>
	import { selectedDistillery } from '$lib/stores/map.js';

	let { distillery } = $props();
	const p = $derived(distillery.properties);
</script>

<div class="flex flex-col h-full">
	<!-- Back button -->
	<button
		onclick={() => selectedDistillery.set(null)}
		class="flex items-center gap-2 px-4 py-3 text-xs text-warm-400 hover:text-warm-50 transition-colors border-b border-white/5"
	>
		<svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		All distilleries
	</button>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto sidebar-scroll">
		<!-- Header -->
		<div class="px-5 pt-5 pb-4 border-b border-white/5">
			<div class="flex items-start justify-between gap-3 mb-2">
				<span class="text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded bg-amber-500/15 text-amber-400">
					{p.state}
				</span>
				<span class="text-xs text-warm-400">Est. {p.founded}</span>
			</div>
			<h2 class="font-display text-xl font-semibold text-warm-50 leading-tight mt-3">
				{p.name}
			</h2>
			<p class="text-xs text-warm-400 mt-1">{p.region}</p>
		</div>

		<!-- Notable -->
		{#if p.notable}
			<div class="mx-5 mt-4 px-3 py-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5">
				<p class="text-xs text-amber-400 leading-relaxed italic">"{p.notable}"</p>
			</div>
		{/if}

		<!-- Description -->
		<div class="px-5 mt-4">
			<p class="text-sm text-warm-200 leading-relaxed">{p.description}</p>
		</div>

		<!-- Styles -->
		<div class="px-5 mt-5">
			<h4 class="text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-2">Whisky Styles</h4>
			<div class="flex flex-wrap gap-1.5">
				{#each p.styles as style}
					<span class="text-xs px-2.5 py-1 rounded-full border border-white/10 text-warm-200">
						{style}
					</span>
				{/each}
			</div>
		</div>

		<!-- Visitor centre -->
		<div class="px-5 mt-4">
			<div class="flex items-center gap-2">
				<div class="w-2 h-2 rounded-full {p.visitor_centre ? 'bg-emerald-500' : 'bg-surface-500'}"></div>
				<span class="text-xs text-warm-400">
					{p.visitor_centre ? 'Visitor centre open to the public' : 'No public visitor centre'}
				</span>
			</div>
		</div>

		<!-- Website -->
		{#if p.website}
			<div class="px-5 mt-6 mb-6">
				<a
					href={p.website}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-200"
				>
					Visit Website
					<svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5m0 0v5m0-5L7 10" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			</div>
		{/if}
	</div>
</div>

<script>
	import { activeFilter } from '$lib/stores/map.js';
	import DistilleryCard from './DistilleryCard.svelte';
	import FilterBar from './FilterBar.svelte';

	let { distilleries = [] } = $props();

	const filtered = $derived(
		$activeFilter === 'ALL'
			? distilleries
			: distilleries.filter((d) => d.properties.state === $activeFilter)
	);

	const stateCounts = $derived(
		distilleries.reduce((acc, d) => {
			acc[d.properties.state] = (acc[d.properties.state] || 0) + 1;
			return acc;
		}, {})
	);
</script>

<div class="flex flex-col h-full">
	<!-- Header -->
	<div class="px-5 pt-5 pb-4 border-b border-white/5">
		<h1 class="font-display text-lg font-semibold text-warm-50 leading-tight">
			Australian Whisky<br />Distilleries
		</h1>
		<p class="text-xs text-warm-400 mt-1.5">
			{filtered.length} of {distilleries.length} distilleries
		</p>
		<div class="mt-3">
			<FilterBar />
		</div>
	</div>

	<!-- List -->
	<div class="flex-1 overflow-y-auto sidebar-scroll">
		{#each filtered as distillery (distillery.properties.id)}
			<DistilleryCard {distillery} />
		{/each}

		{#if filtered.length === 0}
			<div class="px-5 py-8 text-center">
				<p class="text-sm text-warm-400">No distilleries in this region yet.</p>
			</div>
		{/if}
	</div>
</div>

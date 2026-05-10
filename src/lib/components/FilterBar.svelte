<script>
	import { activeFilter } from '$lib/stores/map.js';

	const filters = ['ALL', 'TAS', 'VIC', 'NSW', 'WA', 'SA', 'QLD'];
	const labels = {
		ALL: 'All distilleries',
		TAS: 'Tasmania',
		VIC: 'Victoria',
		NSW: 'New South Wales',
		WA: 'Western Australia',
		SA: 'South Australia',
		QLD: 'Queensland'
	};
</script>

<div class="relative">
	<select
		value={$activeFilter}
		onchange={(e) => activeFilter.set(e.currentTarget.value)}
		class="w-full appearance-none bg-surface-700 border border-white/10 rounded-lg
			   pl-3 pr-8 py-2 text-xs font-medium text-warm-50
			   focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer"
	>
		{#each filters as filter}
			<option value={filter}>{labels[filter]}</option>
		{/each}
	</select>

	<!-- Chevron icon -->
	<div class="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
		<svg class="w-3.5 h-3.5 text-warm-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
</div>

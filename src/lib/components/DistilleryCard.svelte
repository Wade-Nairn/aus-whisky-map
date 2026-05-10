<script>
	import { selectedDistillery } from '$lib/stores/map.js';

	let { distillery } = $props();

	const p = $derived(distillery.properties);
	const isSelected = $derived($selectedDistillery?.properties?.id === p.id);
</script>

<button
	onclick={() => selectedDistillery.set(distillery)}
	class="w-full text-left px-4 py-3.5 transition-all duration-200 border-b border-white/5 group
		{isSelected ? 'bg-amber-500/10 border-l-2 border-l-amber-500 pl-3.5' : 'hover:bg-white/3 border-l-2 border-l-transparent'}"
>
	<div class="flex items-start justify-between gap-2">
		<div class="min-w-0">
			<h3 class="text-sm font-semibold text-warm-50 truncate group-hover:text-white transition-colors">
				{p.name}
			</h3>
			<p class="text-xs text-warm-400 mt-0.5 truncate">{p.region}</p>
		</div>
		<div class="flex flex-col items-end gap-1 shrink-0">
			<span class="text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">
				{p.state}
			</span>
			<span class="text-[10px] text-warm-400">Est. {p.founded}</span>
		</div>
	</div>
	{#if p.visitor_centre}
		<div class="mt-1.5 flex items-center gap-1">
			<svg class="w-3 h-3 text-amber-500/70" viewBox="0 0 16 16" fill="currentColor">
				<path d="M8 1a5 5 0 100 10A5 5 0 008 1zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM4 14.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z"/>
			</svg>
			<span class="text-[10px] text-warm-400">Visitor centre</span>
		</div>
	{/if}
</button>

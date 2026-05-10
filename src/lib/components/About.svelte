<script>
	import { showAbout } from '$lib/stores/map.js';
</script>

<div class="flex flex-col h-full">
	<!-- Back button -->
	<button
		onclick={() => showAbout.set(false)}
		class="flex items-center gap-2 px-4 py-3 text-xs text-warm-400 hover:text-warm-50 transition-colors border-b border-white/5 shrink-0"
	>
		<svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		Back
	</button>

	<div class="flex-1 overflow-y-auto sidebar-scroll px-5 py-5">
		<h2 class="font-display text-xl font-semibold text-warm-50 leading-tight">
			About
		</h2>

		<p class="text-sm text-warm-200 leading-relaxed mt-4">
			Aus Whisky Map is an interactive guide to every whisky distillery operating in Australia —
			from the pioneering single malts of Tasmania to the urban craft distillers of Sydney and
			Melbourne.
		</p>

		<p class="text-sm text-warm-200 leading-relaxed mt-3">
			Australia has quietly become one of the world's most exciting whisky nations. Tasmania led the
			charge in the 1990s when Bill Lark successfully lobbied to overturn century-old distilling
			laws, sparking a craft movement that has since spread to every state.
		</p>

		<div class="mt-6 pt-5 border-t border-white/5">
			<h3 class="text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-3">
				Useful links
			</h3>
			<div class="flex flex-col gap-2">
				<a
					href="https://worldwhiskiesawards.com"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-between text-sm text-warm-200 hover:text-amber-400 transition-colors group"
				>
					World Whiskies Awards
					<svg class="w-3.5 h-3.5 text-warm-400 group-hover:text-amber-400 transition-colors" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5m0 0v5m0-5L7 10" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			</div>
		</div>

		<div class="mt-6 pt-5 border-t border-white/5">
			<h3 class="text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-3">
				Built by
			</h3>
			<p class="text-sm text-warm-200">
				<a
					href="https://wadenairn.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-amber-400 hover:text-amber-300 transition-colors"
				>
					Wade Nairn
				</a>
			</p>
			<p class="text-xs text-warm-400 mt-1.5 leading-relaxed">
				Built with SvelteKit, MapLibre GL, and OpenFreeMap tiles. Data is community-maintained —
				if a distillery is missing, use the suggestion form.
			</p>
		</div>

		<div class="mt-6 pt-5 border-t border-white/5">
			<h3 class="text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-3">
				Map data
			</h3>
			<p class="text-xs text-warm-400 leading-relaxed">
				Map tiles by
				<a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer" class="text-warm-200 hover:text-amber-400 transition-colors">OpenFreeMap</a>
				·
				<a href="https://www.openmaptiles.org" target="_blank" rel="noopener noreferrer" class="text-warm-200 hover:text-amber-400 transition-colors">© OpenMapTiles</a>
				· Data from
				<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" class="text-warm-200 hover:text-amber-400 transition-colors">© OpenStreetMap contributors</a>
			</p>
		</div>
	</div>
</div>

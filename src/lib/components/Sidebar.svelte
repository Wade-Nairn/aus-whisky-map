<script>
	import { selectedDistillery, showSuggestForm, showAbout } from '$lib/stores/map.js';
	import DistilleryList from './DistilleryList.svelte';
	import DistilleryDetail from './DistilleryDetail.svelte';
	import SuggestForm from './SuggestForm.svelte';
	import About from './About.svelte';

	let { distilleries = [] } = $props();
</script>

<aside class="
	absolute top-16 left-4 bottom-4 right-0 z-10
	flex flex-col
	bg-surface-900/95 backdrop-blur-md
	border border-white/10
	rounded-2xl
	shadow-2xl
	max-sm:inset-x-3 max-sm:bottom-3 max-sm:top-auto max-sm:h-[55%] max-sm:right-3
">
	<!-- Mobile drag handle -->
	<div class="sm:hidden flex justify-center pt-2.5 pb-1 shrink-0">
		<div class="w-10 h-1 rounded-full bg-white/20"></div>
	</div>

	<!-- Content switches between list, detail, suggest form, and about -->
	<div class="flex-1 overflow-hidden">
		{#if $showAbout}
			<About />
		{:else if $showSuggestForm}
			<SuggestForm />
		{:else if $selectedDistillery}
			<DistilleryDetail distillery={$selectedDistillery} />
		{:else}
			<DistilleryList {distilleries} />
		{/if}
	</div>

	<!-- Footer -->
	<div class="shrink-0 px-5 py-3 border-t border-white/5 flex items-center justify-between">
		{#if !$showSuggestForm && !$showAbout}
			<button
				onclick={() => { selectedDistillery.set(null); showSuggestForm.set(true); }}
				class="text-[10px] text-warm-400 hover:text-amber-400 transition-colors flex items-center gap-1"
			>
				<svg class="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
					<path d="M8 1a7 7 0 100 14A7 7 0 008 1zm1 10H7V7h2v4zm0-6H7V3h2v2z"/>
				</svg>
				Missing a distillery?
			</button>
		{:else}
			<span class="text-[10px] text-warm-400 tracking-wide">Data current as of 2025</span>
		{/if}
		<div class="flex items-center gap-3">
			<a href="/news" class="text-[10px] text-warm-400 hover:text-amber-400 transition-colors">
				News
			</a>
			<button
				onclick={() => { selectedDistillery.set(null); showSuggestForm.set(false); showAbout.set(true); }}
				class="text-[10px] text-amber-500/60 hover:text-amber-400 transition-colors"
			>
				About
			</button>
		</div>
	</div>
</aside>

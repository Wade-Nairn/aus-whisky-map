<script>
	import { showSuggestForm } from '$lib/stores/map.js';

	// Get your free access key at https://web3forms.com
	const WEB3FORMS_KEY = 'b6495f50-48b6-4066-b4d3-a91bea045231';

	const STATES = ['TAS', 'VIC', 'NSW', 'WA', 'SA', 'QLD', 'NT', 'ACT'];

	let name = $state('');
	let state = $state('');
	let website = $state('');
	let notes = $state('');
	let status = $state('idle'); // idle | submitting | success | error

	async function submit(e) {
		e.preventDefault();
		status = 'submitting';

		try {
			const res = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					access_key: WEB3FORMS_KEY,
					subject: `Distillery suggestion: ${name}`,
					'Distillery name': name,
					State: state,
					Website: website || 'Not provided',
					Notes: notes || 'None'
				})
			});

			const data = await res.json();
			status = data.success ? 'success' : 'error';
		} catch {
			status = 'error';
		}
	}

	function back() {
		showSuggestForm.set(false);
		name = '';
		state = '';
		website = '';
		notes = '';
		status = 'idle';
	}
</script>

<div class="flex flex-col h-full">
	<!-- Back button -->
	<button
		onclick={back}
		class="flex items-center gap-2 px-4 py-3 text-xs text-warm-400 hover:text-warm-50 transition-colors border-b border-white/5 shrink-0"
	>
		<svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M10 3L5 8l5 5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		All distilleries
	</button>

	<div class="flex-1 overflow-y-auto sidebar-scroll px-5 py-5">
		<h2 class="font-display text-lg font-semibold text-warm-50 leading-tight">
			Suggest a Distillery
		</h2>
		<p class="text-xs text-warm-400 mt-1.5 leading-relaxed">
			Know a distillery we've missed? Let us know and we'll add it to the map.
		</p>

		{#if status === 'success'}
			<div class="mt-6 p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/8 text-center">
				<div class="text-2xl mb-2">🥃</div>
				<p class="text-sm font-semibold text-warm-50">Thanks for the tip!</p>
				<p class="text-xs text-warm-400 mt-1">We'll review your suggestion and add it soon.</p>
				<button
					onclick={back}
					class="mt-4 text-xs text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
				>
					Back to the map
				</button>
			</div>
		{:else}
			<form onsubmit={submit} class="mt-5 flex flex-col gap-4">
				<!-- Name -->
				<div>
					<label for="suggest-name" class="block text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-1.5">
						Distillery Name <span class="text-amber-500">*</span>
					</label>
					<input
						id="suggest-name"
						type="text"
						bind:value={name}
						required
						placeholder="e.g. Example Distillery"
						class="w-full bg-surface-700 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-warm-50 placeholder-warm-400/50 focus:outline-none focus:border-amber-500/50 transition-colors"
					/>
				</div>

				<!-- State -->
				<div>
					<label for="suggest-state" class="block text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-1.5">
						State <span class="text-amber-500">*</span>
					</label>
					<select
						id="suggest-state"
						bind:value={state}
						required
						class="w-full bg-surface-700 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-warm-50 focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
					>
						<option value="" disabled selected>Select a state…</option>
						{#each STATES as s}
							<option value={s}>{s}</option>
						{/each}
					</select>
				</div>

				<!-- Website -->
				<div>
					<label for="suggest-website" class="block text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-1.5">
						Website <span class="text-warm-400/50">(optional)</span>
					</label>
					<input
						id="suggest-website"
						type="url"
						bind:value={website}
						placeholder="https://distillery.com.au"
						class="w-full bg-surface-700 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-warm-50 placeholder-warm-400/50 focus:outline-none focus:border-amber-500/50 transition-colors"
					/>
				</div>

				<!-- Notes -->
				<div>
					<label for="suggest-notes" class="block text-[10px] font-semibold tracking-widest uppercase text-warm-400 mb-1.5">
						Any other details <span class="text-warm-400/50">(optional)</span>
					</label>
					<textarea
						id="suggest-notes"
						bind:value={notes}
						rows="3"
						placeholder="Location, year founded, what makes it special…"
						class="w-full bg-surface-700 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-warm-50 placeholder-warm-400/50 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
					></textarea>
				</div>

				{#if status === 'error'}
					<p class="text-xs text-red-400">Something went wrong — please try again.</p>
				{/if}

				<button
					type="submit"
					disabled={status === 'submitting'}
					class="w-full py-2.5 rounded-lg bg-amber-500 text-surface-900 text-sm font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{status === 'submitting' ? 'Sending…' : 'Submit Suggestion'}
				</button>
			</form>
		{/if}
	</div>
</div>

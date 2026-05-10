<script>
	import { onMount } from 'svelte';
	import { selectedDistillery, activeFilter, sidebarOpen } from '$lib/stores/map.js';

	let { distilleries = [] } = $props();

	let map;
	let mapgl;
	let mapReady = $state(false);
	let prevFilter = 'ALL';

	const SIDEBAR_WIDTH = 380;

	function zoomToFilter(filter) {
		const isMobile = window.innerWidth < 640;
		const leftPad = isMobile ? 20 : SIDEBAR_WIDTH + 40;

		if (filter === 'ALL') {
			map.fitBounds([[112, -44], [155, -10]], {
				padding: { top: 40, bottom: 40, left: leftPad, right: 40 },
				duration: 800
			});
			return;
		}

		const subset = distilleries.filter((d) => d.properties.state === filter);
		if (!subset.length) return;

		const lngs = subset.map((d) => d.geometry.coordinates[0]);
		const lats = subset.map((d) => d.geometry.coordinates[1]);

		map.fitBounds(
			[
				[Math.min(...lngs), Math.min(...lats)],
				[Math.max(...lngs), Math.max(...lats)]
			],
			{
				padding: { top: 100, bottom: 100, left: leftPad, right: 100 },
				maxZoom: 9,
				duration: 800
			}
		);
	}

	const geojson = {
		type: 'FeatureCollection',
		features: distilleries
	};

	onMount(async () => {
		mapgl = (await import('maplibre-gl')).default;

		const m = new mapgl.Map({
			container: 'map',
			style: 'https://tiles.openfreemap.org/styles/liberty',
			center: [134, -28],
			zoom: 4,
			minZoom: 3,
			maxZoom: 16,
			attributionControl: false
		});

		m.addControl(new mapgl.NavigationControl(), 'bottom-right');

		m.on('load', () => {
			// Load distillery pin image
			const img = new Image(30, 30);
			img.onload = () => {
				m.addImage('pin', img);

				m.addSource('distilleries', {
					type: 'geojson',
					data: geojson
				});

				// Circle layer — same coordinate system as tiles, guaranteed correct
				m.addLayer({
					id: 'distillery-pins',
					type: 'circle',
					source: 'distilleries',
					paint: {
						'circle-radius': 10,
						'circle-color': '#c8860a',
						'circle-stroke-color': '#0d0d0d',
						'circle-stroke-width': 2
					}
				});

				// Selected highlight ring
				m.addLayer({
					id: 'distillery-selected',
					type: 'circle',
					source: 'distilleries',
					filter: ['==', ['get', 'id'], ''],
					paint: {
						'circle-radius': 16,
						'circle-color': 'transparent',
						'circle-stroke-color': '#f59e0b',
						'circle-stroke-width': 3
					}
				});

				m.on('click', 'distillery-pins', (e) => {
					const feature = e.features[0];
					const distillery = distilleries.find(
						(d) => d.properties.id === feature.properties.id
					);
					if (distillery) {
						selectedDistillery.set(distillery);
						sidebarOpen.set(true);
					}
				});

				m.on('mouseenter', 'distillery-pins', () => {
					m.getCanvas().style.cursor = 'pointer';
				});
				m.on('mouseleave', 'distillery-pins', () => {
					m.getCanvas().style.cursor = '';
				});

				map = m;
				mapReady = true;
			};
			img.src =
				"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3C/svg%3E";
		});

		m.on('click', (e) => {
			const features = m.queryRenderedFeatures(e.point, { layers: ['distillery-pins'] });
			if (!features.length) selectedDistillery.set(null);
		});

		return () => m.remove();
	});

	$effect(() => {
		if (!mapReady) return;

		const sel = $selectedDistillery;
		const filter = $activeFilter;
		const filterChanged = filter !== prevFilter;
		prevFilter = filter;

		// Update selected highlight ring
		if (map.getLayer('distillery-selected')) {
			map.setFilter('distillery-selected', ['==', ['get', 'id'], sel?.properties?.id ?? '']);
		}

		// Filter visible pins by state
		if (map.getLayer('distillery-pins')) {
			map.setFilter(
				'distillery-pins',
				filter === 'ALL' ? null : ['==', ['get', 'state'], filter]
			);
		}

		if (sel) {
			// A distillery was selected — open sidebar and fly to it
			sidebarOpen.set(true);
			const isMobile = window.innerWidth < 640;
			map.flyTo({
				center: sel.geometry.coordinates,
				zoom: 10,
				duration: 1200,
				offset: isMobile ? [0, -150] : [SIDEBAR_WIDTH / 2, 0],
				essential: true
			});
		} else if (filterChanged) {
			// Filter tab changed with no selection — zoom to that state's distilleries
			zoomToFilter(filter);
		}
	});
</script>

<div id="map" style="position:absolute;inset:0;width:100%;height:100%;"></div>

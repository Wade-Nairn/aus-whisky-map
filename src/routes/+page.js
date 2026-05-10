export const prerender = true;

export async function load({ fetch }) {
	const res = await fetch('/data/distilleries.geojson');
	const geojson = await res.json();
	return { distilleries: geojson.features };
}

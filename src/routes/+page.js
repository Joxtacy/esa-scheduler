/** @type {import('./$types').PageLoad} */
export async function load({ fetch, data }) {
	const stream1Raw = await fetch(
		'https://app.esamarathon.com/horaro-proxy/v2/esa/schedule/2023-summer1'
	);
	/** @type {import('$lib/types').ScheduleResponse} */
	const json1 = await stream1Raw.json();

	const stream2Raw = await fetch(
		'https://app.esamarathon.com/horaro-proxy/v2/esa/schedule/2023-summer2'
	);
	/** @type {import('$lib/types').ScheduleResponse} */
	const json2 = await stream2Raw.json();

	const favs = data.favourites.map((favourite) =>
		[...json1.data, ...json2.data].find((schedule) => schedule.id === favourite.id)
	);
	/** @type {import('$lib/types').ScheduleItem[]} */
	const filtered = /** @type {import('$lib/types').ScheduleItem[]} */ (
		/** @type {unknown[]} */ favs.filter((favourite) => favourite != undefined)
	);
	return {
		schedule1: json1?.data ?? [],
		schedule2: json2?.data ?? [],
		favourites: filtered
	};
}

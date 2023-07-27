/** @type {import('./$types').PageLoad} */
export async function load({ fetch, data }) {
	const stream1Raw = await fetch(
		'https://app.esamarathon.com/horaro-proxy/v2/esa/schedule/2023-summer1'
	);
	const json1 = await stream1Raw.json();
	const stream2Raw = await fetch(
		'https://app.esamarathon.com/horaro-proxy/v2/esa/schedule/2023-summer2'
	);
	const json2 = await stream2Raw.json();

	return {
		schedule1: json1?.data ?? [],
		schedule2: json2?.data ?? [],
		favourites: data.favourites
	};
}

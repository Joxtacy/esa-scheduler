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
		// favourites: [
		//   {
		//     length: 3000,
		//     scheduled: '2023-07-22T12:00:00Z',
		//     game: '[Mega Man 2.5D](https://www.twitch.tv/videos/1878672037)',
		//     players: ['[BigJon](https://twitch.tv/BigJon)'],
		//     platform: 'PC',
		//     category: 'Any% (Normal, Single run)',
		//     note: null,
		//     layout: '4x3-1p',
		//     info: null,
		//     id: '1b396ede66d84c85ab50b4c6ca959998',
		//     options: null
		//   }
		// ]
	};
}

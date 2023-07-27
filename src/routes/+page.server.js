import { addFavourite, getFavourites, removeFavourite } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const favourites = await getFavourites();
	console.log('page.server load', favourites);
	return {
		favourites
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		if (id == null) {
			return;
		}
		await addFavourite({ id });
	},
	remove: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		if (id == null) {
			return;
		}
		await removeFavourite({ id });
	}
};

import { addFavourite, getFavourites, removeFavourite } from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const favourites = await getFavourites();
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

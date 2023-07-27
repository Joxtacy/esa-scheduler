import fs from 'fs/promises';

const DB_FILE = 'db.json';

/**
 * @returns {Promise<import('$lib/types').Favourite[]>}
 */
export const getFavourites = async () => {
	let data = [];

	try {
		const file = await fs.readFile(DB_FILE);
		data = JSON.parse(file.toString());
	} catch (error) {
		if (error.code === 'ENOENT') {
			await fs.writeFile(DB_FILE, JSON.stringify([]));
		}
		console.error(`Failed to read ${DB_FILE}`, error);
	}

	const db = [...data];

	return db;
};

/**
 * @param {import('$lib/types').Favourite} favourite
 */
export const addFavourite = async (favourite) => {
	const favourites = await getFavourites();
	if (favourites.some((f) => favourite.id == f.id)) {
		// Already exists, throw proper error
		console.log('Already exists');
		return;
	}
	favourites.push(favourite);
	await fs.writeFile(DB_FILE, JSON.stringify(favourites));
};

/**
 * @param {import('$lib/types').Favourite} favourite
 */
export const removeFavourite = async (favourite) => {
	const favourites = await getFavourites();
	if (favourites.some((f) => favourite.id == f.id)) {
		favourites.splice(
			favourites.findIndex((f) => f.id == favourite.id),
			1
		);
		await fs.writeFile(DB_FILE, JSON.stringify(favourites));
	}
};

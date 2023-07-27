export type Favourite = {
	id: string;
};

export type ScheduleItem = {
	length: number;
	scheduled: string;
	game: string;
	players: string[];
	platform: string;
	category: string;
	note: object | null;
	layout: string;
	info: object | null;
	id: string;
	options: object | null;
};

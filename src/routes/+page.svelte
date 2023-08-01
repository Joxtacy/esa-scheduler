<script>
	import ScheduleItem from '$lib/components/schedule-item.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let filter = '';

	$: favs = data.favourites.sort(
		(a, b) => new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime()
	);
	$: filteredFavs = favs.filter((f) =>
		JSON.stringify(f).toLowerCase().includes(filter.toLowerCase())
	);
	$: filteredStream1 = data.schedule1.filter(
		/** @param {import('$lib/types').ScheduleItem} s */
		(s) => JSON.stringify(s).toLowerCase().includes(filter.toLowerCase())
	);
	$: filteredStream2 = data.schedule2.filter(
		/** @param {import('$lib/types').ScheduleItem} s */
		(s) => JSON.stringify(s).toLowerCase().includes(filter.toLowerCase())
	);
</script>

<input type="text" bind:value={filter} />
<h1>Favourites</h1>
<div class="schedule-wrapper">
	{#each filteredFavs as scheduleItem (scheduleItem.id)}
		<ScheduleItem {scheduleItem} action="remove" />
	{/each}
</div>
<div class="stream-wrapper">
	<div class="schedule-wrapper">
		<h1>Stream 1</h1>
		{#each filteredStream1 as scheduleItem (scheduleItem.id)}
			<ScheduleItem {scheduleItem} action="add" />
		{/each}
	</div>
	<div class="schedule-wrapper">
		<h1>Stream 2</h1>
		{#each filteredStream2 as scheduleItem (scheduleItem.id)}
			<ScheduleItem {scheduleItem} action="add" />
		{/each}
	</div>
</div>

<style>
	.stream-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>

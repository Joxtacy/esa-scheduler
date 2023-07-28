<script>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import moment from 'moment';

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

	/**
	 * @param {string} markdownLink
	 * @returns {Array <string|undefined>}
	 */
	const getLink = (markdownLink) => {
		const regex = /\[(.*)\]\((.*)\)/;
		if (regex.test(markdownLink)) {
			const match = regex.exec(markdownLink);
			if (match && match[1] && match[2]) {
				return [match[1], match[2]];
			}
		}
		return [markdownLink, undefined];
	};
</script>

<input type="text" bind:value={filter} />
<h1>Favourites</h1>
<div class="schedule-wrapper">
	{#each filteredFavs as s (s.id)}
		{@const link = getLink(s.players[0])}
		<div class="schedule-item" transition:fade>
			<span>{moment(s.scheduled).format('dddd, MMMM Do HH:mm')}</span>
			<span
				>{moment.utc(moment.duration(s.length, 'seconds').asMilliseconds()).format('HH:mm')}</span
			>
			{#if getLink(s.game)[1]}
				<a href={getLink(s.game)[1]}>{getLink(s.game)[0]}</a>
			{:else}
				<span>{getLink(s.game)[0]}</span>
			{/if}
			<div class="players">
				<!-- {#each s.players as p} -->
				<div class="player">
					{#if link[1]}
						<a href={link[1]}>{link[0]}</a>
					{:else}
						<span>{link[0]}</span>
					{/if}
				</div>
				<!-- {/each} -->
			</div>
			<span class="category">{s.category}</span>
			<form method="POST" action="?/remove" use:enhance>
				<input type="hidden" name="id" value={s.id} />
				<button type="submit">Remove</button>
			</form>
		</div>
	{/each}
</div>
<h1>Stream 1</h1>
<div class="schedule-wrapper">
	{#each filteredStream1 as s (s.id)}
		{@const link = getLink(s.players[0])}
		<div class="schedule-item">
			<span>{moment(s.scheduled).format('dddd, MMMM Do HH:mm')}</span>
			<span
				>{moment.utc(moment.duration(s.length, 'seconds').asMilliseconds()).format('HH:mm')}</span
			>
			{#if getLink(s.game)[1]}
				<a href={getLink(s.game)[1]}>{getLink(s.game)[0]}</a>
			{:else}
				<span>{getLink(s.game)[0]}</span>
			{/if}
			<div class="players">
				<!-- {#each s.players as p} -->
				<div class="player">
					{#if link[1]}
						<a href={link[1]}>{link[0]}</a>
					{:else}
						<span>{link[0]}</span>
					{/if}
				</div>
				<!-- {/each} -->
			</div>
			<span class="category">{s.category}</span>
			<form method="POST" action="?/add" use:enhance>
				<input type="hidden" name="id" value={s.id} />
				<button type="submit">Add</button>
			</form>
		</div>
	{/each}
</div>
<h1>Stream 2</h1>
<div class="schedule-wrapper">
	{#each filteredStream2 as s (s.id)}
		{@const link = getLink(s.players[0])}
		<div class="schedule-item">
			<span>{moment(s.scheduled).format('dddd, MMMM Do HH:mm')}</span>
			<span
				>{moment.utc(moment.duration(s.length, 'seconds').asMilliseconds()).format('HH:mm')}</span
			>
			{#if getLink(s.game)[1]}
				<a href={getLink(s.game)[1]}>{getLink(s.game)[0]}</a>
			{:else}
				<span>{getLink(s.game)[0]}</span>
			{/if}
			<div class="players">
				<!-- {#each s.players as p} -->
				<div class="player">
					{#if link[1]}
						<a href={link[1]}>{link[0]}</a>
					{:else}
						<span>{link[0]}</span>
					{/if}
				</div>
				<!-- {/each} -->
			</div>
			<span class="category">{s.category}</span>
			<form method="POST" action="?/add" use:enhance>
				<input type="hidden" name="id" value={s.id} />
				<button type="submit">Add</button>
			</form>
		</div>
	{/each}
</div>

<style>
	.schedule-item {
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
	}
	.players {
		display: flex;
		margin: 0.5rem;
	}
	span {
		margin: 0.5rem;
	}
</style>

<script>
	import { enhance } from '$app/forms';
	import moment from 'moment';

	/** @type {import('./$types').PageData} */
	export let data;

	let filter = '';

	$: favs = data.favourites
		.map((f) => [...data.schedule1, ...data.schedule2].find((s) => s.id === f.id))
		.sort((a, b) => new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime());
	$: filteredFavs = favs.filter((f) =>
		JSON.stringify(f).toLowerCase().includes(filter.toLowerCase())
	);
	$: filteredStream1 = data.schedule1.filter((s) =>
		JSON.stringify(s).toLowerCase().includes(filter.toLowerCase())
	);
	$: filteredStream2 = data.schedule2.filter((s) =>
		JSON.stringify(s).toLowerCase().includes(filter.toLowerCase())
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
{#each filteredFavs as f (f.id)}
	<div class="schedule-item">
		<span>{moment(f.scheduled).format('dddd, MMMM Do HH:mm')}</span>
		<span>{moment.utc(moment.duration(f.length, 'seconds').asMilliseconds()).format('HH:mm')}</span>
		{#if getLink(f.game)[1]}
			<a href={getLink(f.game)[1]}>{getLink(f.game)[0]}</a>
		{:else}
			<span>{getLink(f.game)[0]}</span>
		{/if}
		<div class="players">
			{#each f.players as p}
				<div class="player">
					{#if getLink(p)[1]}
						<a href={getLink(p)[1]}>{getLink(p)[0]}</a>
					{:else}
						<span>{getLink(p)[0]}</span>
					{/if}
				</div>
			{/each}
		</div>
		<span class="category">{f.category}</span>
		<form method="POST" action="?/remove" use:enhance>
			<input type="hidden" name="id" value={f.id} />
			<button type="submit">Remove</button>
		</form>
	</div>
{/each}
<h1>Stream 1</h1>
{#each filteredStream1 as s (s.id)}
	<div class="schedule-item">
		<span>{moment(s.scheduled).format('dddd, MMMM Do HH:mm')}</span>
		{#if getLink(s.game)[1]}
			<a href={getLink(s.game)[1]}>{getLink(s.game)[0]}</a>
		{:else}
			<span>{getLink(s.game)[0]}</span>
		{/if}
		<div class="players">
			{#each s.players as p}
				<div class="player">
					{#if getLink(p)[1]}
						<a href={getLink(p)[1]}>{getLink(p)[0]}</a>
					{:else}
						<span>{getLink(p)[0]}</span>
					{/if}
				</div>
			{/each}
		</div>
		<span class="category">{s.category}</span>
		<form method="POST" action="?/add" use:enhance>
			<input type="hidden" name="id" value={s.id} />
			<button type="submit">Add</button>
		</form>
	</div>
{/each}
<h1>Stream 2</h1>
{#each filteredStream2 as s (s.id)}
	<div class="schedule-item">
		<span>{moment(s.scheduled).format('dddd, MMMM Do HH:mm')}</span>
		{#if getLink(s.game)[1]}
			<a href={getLink(s.game)[1]}>{getLink(s.game)[0]}</a>
		{:else}
			<span>{getLink(s.game)[0]}</span>
		{/if}
		<div class="players">
			{#each s.players as p}
				<div class="player">
					{#if getLink(p)[1]}
						<a href={getLink(p)[1]}>{getLink(p)[0]}</a>
					{:else}
						<span>{getLink(p)[0]}</span>
					{/if}
				</div>
			{/each}
		</div>
		<span class="category">{s.category}</span>
		<form method="POST" action="?/add" use:enhance>
			<input type="hidden" name="id" value={s.id} />
			<button type="submit">Add</button>
		</form>
	</div>
{/each}

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

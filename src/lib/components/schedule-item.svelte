<script>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import moment from 'moment';

	/** @type {import('$lib/types').ScheduleItem} */
	export let scheduleItem;

	let open = false;

	const toggleOpen = () => {
		open = !open;
	};

	$: extraPlayers = scheduleItem.players.length - 1;
	$: gameLink = getLink(scheduleItem.game);
	$: playerLink = getLink(scheduleItem.players[0]);

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

<div
	class="schedule-item"
	transition:fade
	on:click={toggleOpen}
	on:keypress={toggleOpen}
	role="menuitem"
	tabindex="0"
>
	<span>{moment(scheduleItem.scheduled).format('dddd, MMMM Do HH:mm')}</span>
	<span
		>{moment
			.utc(moment.duration(scheduleItem.length, 'seconds').asMilliseconds())
			.format('HH:mm')}</span
	>
	{#if gameLink[1]}
		<a href={gameLink[1]}>{gameLink[0]}</a>
	{:else}
		<span>{gameLink[0]}</span>
	{/if}
	<div class="players">
		{#if open}
			{#each scheduleItem.players as p}
				{@const playerLink = getLink(p)}
				<div class="player">
					{#if playerLink[1]}
						<a href={playerLink[1]}>{playerLink[0]}</a>
					{:else}
						<span>{playerLink[0]}</span>
					{/if}
				</div>
			{/each}
		{:else}
			<div class="player">
				{#if playerLink[1]}
					<a href={playerLink[1]}>{playerLink[0]}{extraPlayers > 0 ? ` + ${extraPlayers}` : ''}</a>
				{:else}
					<span>{playerLink[0]}{extraPlayers > 0 ? ` + ${extraPlayers}` : ''}</span>
				{/if}
			</div>
		{/if}
	</div>
	<span class="category">{scheduleItem.category}</span>
	<form method="POST" action="?/remove" use:enhance>
		<input type="hidden" name="id" value={scheduleItem.id} />
		<button type="submit">Remove</button>
	</form>
</div>

<style>
	.schedule-item {
		margin-bottom: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	}
	.schedule-item:hover {
		cursor: pointer;
	}
</style>

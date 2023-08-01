<script>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import moment from 'moment';

	import Players from '$lib/components/players.svelte';
	import Game from '$lib/components/game.svelte';
	import Category from '$lib/components/category.svelte';

	/** @type {import('$lib/types').ScheduleItem} */
	export let scheduleItem;

	/** @type {string} */
	export let action;

	let open = false;

	const toggleOpen = () => {
		open = !open;
	};
</script>

<div
	class="schedule-item"
	class:current={moment(scheduleItem.scheduled)
		.add(scheduleItem.length, 'seconds')
		.isAfter(new Date()) && moment(scheduleItem.scheduled).isBefore(new Date())}
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

	<Game game={scheduleItem.game} />
	<Players players={scheduleItem.players} {open} />
	<Category category={scheduleItem.category ? scheduleItem.category : ''} />
	<form method="POST" action="?/{action}" on:submit|stopPropagation use:enhance>
		<input type="hidden" name="id" value={scheduleItem.id} />
		<button type="submit" style="text-transform: capitalize;">{action}</button>
	</form>
	{#if scheduleItem.note != null}
		<div class="note-wrapper">
			<span class="note">
				{scheduleItem.note}
			</span>
		</div>
	{/if}
</div>

<style>
	.schedule-item {
		display: grid;
		grid-template-columns: 1.5fr 0.5fr 2fr 1fr 1.5fr 0.5fr 0.5fr;
		padding: 0.5rem;
		margin: 0.5rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.schedule-item:hover {
		cursor: pointer;
	}
	.current {
		background-color: #794582;
		color: white;
	}
</style>

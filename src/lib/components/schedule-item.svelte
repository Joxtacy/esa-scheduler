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
	<span>
		{moment.utc(moment.duration(scheduleItem.length, 'seconds').asMilliseconds()).format('HH:mm')}
	</span>

	<Game game={scheduleItem.game} />
	<Players players={scheduleItem.players} {open} />
	<Category category={scheduleItem.category ? scheduleItem.category : ''} />
	<form method="POST" action="?/{action}" use:enhance>
		<input type="hidden" name="id" value={scheduleItem.id} />
		<button type="submit" class:add={action === 'add'} class:remove={action === 'remove'}>
			{#if action == 'add'}
				<i class="fa-solid fa-plus" />
			{:else}
				<i class="fa-regular fa-trash-can" />
			{/if}
		</button>
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
		column-gap: 0.5rem;
		justify-items: start;
		align-items: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.schedule-item:hover {
		cursor: pointer;
	}
	.current {
		background-color: #794582;
		color: white;
	}
	button {
		font-family: inherit;
		font-size: inherit;
		border: none;
		background-color: unset;
		cursor: pointer;
	}

	.add,
	.remove {
		transition-property: color;
		transition-duration: 0.3s;
		transition-timing-function: ease-in-out;
	}

	.remove:hover {
		animation-duration: 0.3s;
		animation-name: wiggle;
		color: var(--bad_color);
	}

	.add:hover {
		animation-duration: 0.3s;
		animation-name: wiggle;
		color: var(--link_hover_color);
	}
</style>

<script>
	import Player from '$lib/components/player.svelte';

	/** @type {string[]} */
	export let players;

	/** @type {boolean} */
	export let open = false;

	$: extraPlayers = players.length - 1;
</script>

<div class="players">
	{#if open}
		{#each players as player}
			<Player {player} />
		{/each}
	{:else}
		<Player player={players[0]} extraLabel={extraPlayers > 0 ? ` + ${extraPlayers}` : ''} />
	{/if}
</div>

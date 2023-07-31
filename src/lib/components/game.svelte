<script>
	import { getLink } from '$lib/utils';

	/** @type {string} */
	export let game;

	$: gameLink = getLink(game);
</script>

<div class="game-wrapper">
	{#if gameLink[1]}
		<a href={gameLink[1]}>{gameLink[0]}</a>
	{:else}
		<span>{gameLink[0]}</span>
	{/if}
</div>

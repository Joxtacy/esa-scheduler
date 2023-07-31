<script>
	import { getLink } from '$lib/utils';

	/** @type {string} */
	export let player;

	/** @type {string} */
	export let extraLabel = '';

	$: playerLink = getLink(player);
</script>

<div class="player">
	{#if playerLink[1]}
		<a href={playerLink[1]}>{playerLink[0]}{extraLabel}</a>
	{:else}
		<span>{playerLink[0]}{extraLabel}</span>
	{/if}
</div>

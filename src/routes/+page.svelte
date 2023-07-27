<script>
	import SvelteMarkdown from 'svelte-markdown';

	/** @type {import('./$types').PageData} */
	export let data;

	// const find = (id) => data.schedule.find((s) => s.id === id);
	$: favs = data.favourites
		.map((f) => [...data.schedule1, ...data.schedule2].find((s) => s.id === f.id))
		.sort((a, b) => new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime());
	//$: console.log('favs', favs);
</script>

<h1>Favourites</h1>
{#each favs as f (f.id)}
	<span>{new Date(f.scheduled).toString()}</span>
	<form method="POST" action="?/remove">
		<input type="hidden" name="id" value={f.id} />
		<button type="submit">Remove</button>
	</form>
	<SvelteMarkdown source={f.game} />
	{#each f.players as p}
		<SvelteMarkdown source={p} />
	{/each}
{/each}
<h1>Stream 1</h1>
{#each data.schedule1 as s (s.id)}
	<span>{new Date(s.scheduled).toString()}</span>
	<form method="POST" action="?/add">
		<input type="hidden" name="id" value={s.id} />
		<button type="submit">Add</button>
	</form>
	<SvelteMarkdown source={s.game} />
	{#each s.players as p}
		<SvelteMarkdown source={p} />
	{/each}
{/each}
<h1>Stream 2</h1>
{#each data.schedule2 as s (s.id)}
	<span>{new Date(s.scheduled).toTimeString()}</span>
	<form method="POST" action="?/add">
		<input type="hidden" name="id" value={s.id} />
		<button type="submit">Add</button>
	</form>
	<SvelteMarkdown source={s.game} />
	{#each s.players as p}
		<SvelteMarkdown source={p} />
	{/each}
{/each}

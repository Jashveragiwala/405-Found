<script>
	import { goto } from '$app/navigation';
	import { page } from "$app/stores";
	// import ChildPage from './programme/+page.svelte';
	export let data;
	const items = data.progs;
</script>

<!-- <ChildPage dt = { items } /> -->
<div class="flex flex-col min-w-full space-y-8 items-center">
	<h1 class="text-4xl font-bold py-3 pt-20 mt-5">Loyalty Programmes</h1>
	<a class="text-primary" href={`/${$page.params.user}/summary/history`}>View Transaction History</a>
	{#each items as item}	
	<div class="card w-96 bg-base-200 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{item.lp_name}</h2>
			<p>{item.description === null ? "Description goes here" : item.description}</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary" on:click={() => goto(`/${$page.params.user}/summary/${item.lp_id}`)}>See More</button>
			</div>
		</div>
	</div>
	{/each}
	<button class="btn" on:click={() => goto(`/${$page.params.user}`)}>Back to Home</button>
	<div class="pb-20 mb-5" />
</div>

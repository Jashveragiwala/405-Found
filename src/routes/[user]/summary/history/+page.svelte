<script>
    import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	export let data;
	const transac = data.transac;
	transac?.sort((a,b) => {
		let aDate = new Date(a.transac_data);
		let bDate = new Date(b.transac_data);
		return aDate > bDate ? -1 : aDate === bDate ? 0 : 1;
	});
</script>

<div class="hero min-h-screen">
	<div class="hero-content text-center">
		<div class="max-w-lg">
			<h1 class="text-4xl font-bold py-3 pt-20 mt-5">Transaction History</h1>
			{#if transac == null || transac.length === 0}
				<p class="py-6">No transaction history</p>
			{:else}
				<table class="my-6">
					<tr class="join w-full">
							<th class="join-item btn w-1/6 btn-primary">Date</th>
							<th class="join-item btn w-1/6 btn-primary">Time</th>
							<th class="join-item btn w-1/4 btn-primary">Loyalty Programme</th>
							<th class="join-item btn w-1/6 btn-primary">Amount</th>
							<th class="join-item btn w-1/4 btn-primary">Status</th>
					</tr>
					{#each transac as tr}
					<tr class="join w-full">
						<td class="join-item btn w-1/6 border-1 border-slate-200">{tr.transac_data.split("T")[0]}</td>
						<td class="join-item btn w-1/6 border-1 border-slate-200">{tr.transac_data.split("T")[1].split(".")[0]}</td>
						<td class="join-item btn w-1/4 border-1 border-slate-200">{tr.target_lp_id}</td>
						<td class="join-item btn w-1/6 border-1 border-slate-200">{tr.amount}</td>
						<td class="join-item btn w-1/4 border-1 border-slate-200">{tr.status}</td>
					</tr>
					{/each}
				</table>
			{/if}
            <button class="btn" on:click={goto(`/${$page.params.user}/summary`)}>Back to Programmes</button>
			<div class="pb-10 mb-5" />
		</div>
	</div>
</div>

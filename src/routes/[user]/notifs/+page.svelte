<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	// import Table from './Table.svelte';
	import { successfulArray, pendingArray, unsentArray, failedArray } from './data-store';
	import { error } from '@sveltejs/kit';
	const user = $page.params.user;
	// Get data from API route
  	onMount(async () => {
		$successfulArray = [];
		$pendingArray = []
		const res = await fetch('/api/notifications?'
		+ new URLSearchParams({
			// Use this in testing
			// userID: "4HP3c0PQLp" // Success
			// userID: "SPHztBOoAG" // Pending/Unsent	
			// Use this when in production instead
			userID: user
		}), {
				method: 'GET',
			})
		let data = await res.json();
		data = data.data;
		console.log(data)
		if (data.length === 0) {
			throw error(404, "User table is empty" )
		}
		// Reassigning data/changing data headers (can add more data fields/columns in the table here)
		data = data.map((item) => {
			const datetime = new Date(item.transac_data + "Z").toLocaleString();
			const [date, time] = datetime.split(", ")
			const notifObj = { "Trn. ID": item.transac_id, "Date": date, "Time": time.split(".")[0], "Notification": `Redeemed ${item.amount} miles` };
			if (item.status.toLowerCase() == "success") {
				$successfulArray = ([...$successfulArray, notifObj])
			} else if (item.status.toLowerCase() == "pending") {
				$pendingArray = ([...$pendingArray, notifObj])
			} else if (item.status.toLowerCase() == 'error') {
				$failedArray = ([...$failedArray, notifObj])
			} else {
				$unsentArray = ([...$unsentArray, notifObj])
			}
		})
	})
	// let blueStyle = "blueTable";
</script>

<div class="hero">
	<div class="hero-content text-center">
	  	<div class="max-w-2xl">
			<h1 class="text-4xl font-bold py-10">Notifications</h1>
			<!-- Checks if the notification array has records -->
			<!-- If records do exist, display them here -->
			{#if $successfulArray.length > 0}
			<h1 class="text-3xl font-bold pt-5 text-green-400 text-left">Successful</h1>
			<table class="my-4 table">
				<thead>
					<tr>
						<th></th>
						{#each Object.keys($successfulArray[0]) as columnHeading}
							<th class="">{columnHeading}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each Object.values($successfulArray) as row, i}
						<tr class="hover">
							<td>{i + 1}</td>
						{#each Object.values(row) as cell}
							<td class="">{cell}</td>
						{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			{/if}
			{#if $pendingArray.length > 0}
			<h1 class="text-3xl font-bold pt-5 text-yellow-400 text-left">Pending</h1>
			<table class="my-4 table">
				<thead>
					<tr>
						<th></th>
						{#each Object.keys($pendingArray[0]) as columnHeading}
							<th class="">{columnHeading}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each Object.values($pendingArray) as row, i}
						<tr class="hover">
							<td>{i + 1}</td>
						{#each Object.values(row) as cell}
							<td class="">{cell}</td>
						{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			{/if}
			{#if $unsentArray.length > 0}
			<h1 class="text-3xl font-bold pt-5 text-purple-400 text-left">Unsent</h1>
			<table class="my-4 table">
				<thead>
					<tr>
						<th></th>
						{#each Object.keys($unsentArray[0]) as columnHeading}
							<th class="">{columnHeading}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each Object.values($unsentArray) as row, i}
						<tr class="hover">
							<td>{i + 1}</td>
						{#each Object.values(row) as cell}
							<td class="">{cell}</td>
						{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			{/if}
			{#if $failedArray.length > 0}
			<h1 class="text-3xl font-bold pt-5 text-red-400 text-left">Failed</h1>
			<table class="my-4 table">
				<thead>
					<tr>
						<th></th>
						{#each Object.keys($failedArray[0]) as columnHeading}
							<th class="">{columnHeading}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each Object.values($failedArray) as row, i}
						<tr class="hover">
							<td>{i + 1}</td>
						{#each Object.values(row) as cell}
							<td class="">{cell}</td>
						{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			{/if}
			<!-- If they don't, show a message -->
			{#if $successfulArray.length == 0 && $pendingArray.length == 0 && $unsentArray.length == 0 && $failedArray.length == 0}
			<h2 class="py-5">No notifications</h2>
			{/if}

			<button class="btn" on:click="{() => goto(`/${$page.params.user}`)}">Back to Home</button>
	  </div>
	</div>
  </div>
  
<script>
	import '../../app.css';

	async function post() {
		const response = await fetch('/api/request', {
			method: 'POST',
			body: JSON.stringify({
				transac_id: '2023-07-18T12:03:26.760Z',
				source_lp_id: 'BANKAPP',
				target_lp_id: 'SHOPEE',
				target_member_id: 'sqywIhvc4I',
				source_member_id: '5Jld6n31uH',
				first_name: 'testing',
				last_name: 'test',
				transac_data: '2023-07-17 12:03:27.387',
				amount: 6617,
				phone: 99022915,
				email: 'testing@test.com'
			})
		});
	}

	async function get() {
		const response = await fetch('api/transaction_info_user?source_member_id=PykQzb346D');
		const data = await response.json();
		console.log(data);
	}

	async function accrual() {
		const response = await fetch('api/accrual', { method: 'POST' });
	}

	async function handback() {
		const response = await fetch('api/handback');
	}

</script>

<div class="hero">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Function showcase</h1>
			<button class="btn btn-primary m-1" on:click={accrual}>Accrual</button>
			<button class="btn btn-primary m-1" on:click={handback}>Handback</button>
		</div>
	</div>
</div>

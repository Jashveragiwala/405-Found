<script>
	import '../../app.css';
	import Header from '$lib/header/Header.svelte';
</script>

<div class="flex flex-col max-h-screen min-h-screen">
	<div class="top-0 w-full z-50">
		<Header />
	</div>

	<main class="flex grow">
		<slot />
	</main>
</div>

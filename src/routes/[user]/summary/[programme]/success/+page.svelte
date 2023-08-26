<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
</script>

<div class="hero">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-4xl font-bold">Transfer Request Sent!</h1>
      <p class="py-6">Your transaction ID is: {$page.url.searchParams.get("transac_id")}<br>
        You will be notified upon request approval.</p>
      <button class="btn m-1" on:click={() => {goto("../")}}>Back to Programmes</button>
      <button class="btn m-1" on:click={() => {goto("../../")}}>Back to Home</button>
    </div>
  </div>
</div>

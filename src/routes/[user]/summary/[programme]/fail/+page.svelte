<script>
    import { goto } from '$app/navigation';
</script>

<div class="hero">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-4xl font-bold">Transfer Request Failed</h1>
      <p class="py-6">An error occured. Please contact us for assistance.</p>
      <button class="btn m-1" on:click={() => {goto("../")}}>Back to Programmes</button>
      <button class="btn m-1" on:click={() => {goto("../../")}}>Back to Home</button>
    </div>
  </div>
</div>

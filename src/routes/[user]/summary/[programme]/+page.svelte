<script>
	import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  export let data;
  const progs = data.progs;
</script>

<div class="hero min-h-screen">
    <div class="hero-content">
      <div class="max-w-md">
        {#each progs as item}
        <h1 class="text-4xl font-bold">{item.lp_name}</h1>
        <p class="pt-3">{item.description}</p>
        <p>1 Mile = {item.Value} {item.currency}</p>
        <p class="pb-3">Processing time: {item.processing_time}</p>
        <button class="btn btn-primary" on:click="{() => goto(`/${$page.params.user}/summary/${$page.params.programme}/redeem`)}">Transfer Miles</button>
        <button class="btn" on:click="{() => goto(`/${$page.params.user}/summary`)}">Back to Programmes</button>
        {/each}
      </div>
    </div>
  </div>
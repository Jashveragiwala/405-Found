<script>
	import { goto } from '$app/navigation';

  export let data;
  const prod = data.users;
</script>


<div class="hero min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">
      {#if prod.length != 0}
        {#each prod as info}
        <h1 class="text-4xl font-bold">{info.first_name} {info.last_name}</h1>
	      <p class="pt-6 font-semibold">Contacts</p>
        <ul class="py-1 pb-2">
          <li>{info.notify_phone ? "\u2713" : "\u2717"} Phone: {info.phone}</li>
          <li>{info.notify_email ? "\u2713" : "\u2717"} Email: {info.email}</li>
        </ul>
        <p class="font-semibold">Miles</p>
        <p class="py-1 pb-6">{info.points}</p>
        <button class="btn m-1" on:click="{() => goto(`/${info.source_member_id}/addmiles/`)}">Add Miles</button>
	      <button class="btn m-1" on:click="{() => goto(`/${info.source_member_id}/editinfo/`)}">Edit User Info</button>
        <button class="btn btn-error m-1" on:click="{() => goto('/')}">Sign Out</button>
        <button class="btn m-1" on:click={() => goto(`/${info.source_member_id}`)}>Back to Home</button>
        {/each}
      {:else}
      <p class="py-1 pb-6">User not found</p>
      {/if}
    </div>
  </div>
</div>

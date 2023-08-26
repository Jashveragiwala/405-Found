<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  let dt = [];
  let inputValue = '';
  let error = '';

  export let data;
  const users = data.users;
  async function updatePoints() {
    const milesToAdd = inputValue;

    if (!Number.isInteger(milesToAdd) || milesToAdd <= 0) {
      error = 'Please enter a positive integer.';
      return;
    }

    let updatedData = users.map((info) => {
      const updatedPoints = info.points + parseInt(milesToAdd);
      return { ...info, points: updatedPoints };
    });
    updatedData = updatedData[0];

    try {
      const response = await fetch('/api/bankapp/points', {
        method: 'POST',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response);

      if (response.ok) {
        dt = updatedData;
        inputValue = ''; // Reset the input value
        error = ''; // Reset the error message
        alert("Miles updated successfully!");
        goto(`/${$page.params.user}/info/`);
      } else {
        error = 'Failed to update points.';
      }
    } catch (e) {
      error = 'An error occurred while updating points.';
    }
  }


  function cancel(user) {
    goto(`/${user}/info/`);
  }
</script>

<div class="hero min-h-screen">
  <div class="hero-content">
    <div class="max-w-md">
        {#each users as info}
          <h1 class="text-4xl font-bold">Add Miles</h1>
          <p class="py-6">Currently you have: {info.points} Miles</p>
          <input
            type="number"
            min="1"
            step="1"
            bind:value="{inputValue}"
            class="border border-gray-300 rounded p-2 mb-5"
            placeholder="Enter Miles to Add"
            data-testid="milesInput"
          />
          {#if error}
            <p class="text-red-500" data-testid="error">{error}</p>
          {/if}
          <br>
          <p>New total = <span data-testid="newtotal">{Number.isInteger(inputValue) && inputValue > 0 ? parseInt(inputValue) + info.points : info.points}</span> Miles</p>
          <br>
          <button class="btn btn-primary" on:click="{updatePoints}">Add</button>
          <button class="btn" on:click="{() => cancel(info.source_member_id)}">Cancel</button>
        {/each}
    </div>
  </div>
</div>


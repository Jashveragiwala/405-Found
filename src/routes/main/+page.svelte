<style>
  @import "../../app.css";
</style>

<script>
	import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isAuth } from "../login/+page.svelte";

  function handleAuthentication() {
    if (isAuth) {
      console.log(isAuth);
      goto("../main");
    } else {
      console.log("Please log in first.");
      goto("../login");
    }
  }

  onMount(() => {
    handleAuthentication();
  });

  export async function handleCancel() {
    goto("../login");
  }
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-4xl font-bold py-5">Welcome Page</h1>
    </div>
  </div>
</div>

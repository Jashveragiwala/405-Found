<!-- Navbar.svelte -->

<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isAuth, username } from "../login/+page.svelte";
  function handleLogout() {
    goto("../login");
  }
  function handleTransfer() {
    goto("../transfer");
  }
  function handleHistory() {
    goto("../transaction");
  }

  function handleDashboard() {
    goto("../main");
  }
</script>

<style>
  .navbar {
    background-color: #212121;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px; /* Corrected the decimal point */
    border-bottom: 2px solid #fff;
  }

  .navbar-brand {
    font-size: 24px;
    font-weight: bold;
  }

  .navbar-links {
    list-style-type: none;
    display: flex;
    gap: 20px;
  }

  .navbar-link {
    font-size: 18px;
    cursor: pointer;
  }

  .navbar-link:hover {
    text-decoration: underline;
  }

  /* For mobile responsiveness */
  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
    }

    .navbar-links {
      margin-top: 10px;
    }
  }
</style>

<div class="navbar">
  <div class="navbar-brand">My Digital Wallet</div>
  <ul class="navbar-links">
    <li class="navbar-link" on:click={handleDashboard}>Dashboard</li>
    <li class="navbar-link" on:click={handleTransfer}>Transfer Funds</li>
    <li class="navbar-link" on:click={handleHistory}>Transaction History</li>
    <li class="navbar-link" on:click={handleLogout}>Logout</li>
  </ul>
</div>

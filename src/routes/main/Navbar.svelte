<!-- Navbar.svelte -->

<script>
  // You can add any logic or event handlers here
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
    <li class="navbar-link">Dashboard</li>
    <li class="navbar-link">Transfer Funds</li>
    <li class="navbar-link">Transaction History</li>
    <li class="navbar-link">Logout</li>
  </ul>
</div>

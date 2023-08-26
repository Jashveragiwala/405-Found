<!-- Dashboard.svelte -->

<script lang="ts">
  let bankAccounts = [
    {
      bankName: 'Bank A',
      accountNumber: '123456',
      deposits: 1500
    },
    {
      bankName: 'Bank B',
      accountNumber: '789012',
      deposits: 2500
    },
    {
      bankName: 'Bank C',
      accountNumber: '738928',
      deposits: 6500
    },
    {
      bankName: 'Bank D',
      accountNumber: '873621',
      deposits: 500
    },
    {
      bankName: 'Bank E',
      accountNumber: '098372',
      deposits: 300
    },
    // ... add more accounts
  ];

  let totalAmount = bankAccounts.reduce((total, account) => total + account.deposits, 0);

  function removeAccount(index: number) {
    bankAccounts = bankAccounts.filter((_, i) => i !== index);
    updateTotalAmount();
  }

  function addAccount() {
    // Logic to add a new bank account
  }

  function updateTotalAmount() {
    totalAmount = bankAccounts.reduce((total, account) => total + account.deposits, 0);
  }
</script>

<style>
  .dashboard {
    background-color: #212121;
    color: black; /* Text color updated to black */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .dashboard-header {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    color: white; /* Header text color */
  }

  .total-amount {
    font-size: 24px;
    margin-bottom: 20px;
    color: white; /* Text color */
  }

  .account-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .card {
    background-color: #f7f7f7;
    border-radius: 8px;
    padding: 15px;
    width: calc(50% - 10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .remove-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .bank-info {
    margin-top: 10px;
  }

  .bank-name {
    font-size: 18px;
    font-weight: bold;
  }

  .account-number {
    margin-top: 5px;
  }

  .deposits {
    margin-top: 5px;
    font-weight: bold;
  }

  .add-button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="dashboard">
  <div class="dashboard-header">Dashboard</div>
  <div class="total-amount">Total Amount: ${totalAmount}</div>
  <div class="account-cards">
    {#each bankAccounts as account, index}
      <div class="card">
        <button class="remove-button" on:click={() => removeAccount(index)}>Remove</button>
        <div class="bank-info">
          <div class="bank-name">{account.bankName}</div>
          <div class="account-number">Account Number: {account.accountNumber}</div>
          <div class="deposits">Deposits: ${account.deposits}</div>
        </div>
      </div>
    {/each}
    <button class="add-button" on:click={addAccount}>+</button>
  </div>
</div>
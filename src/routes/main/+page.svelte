<!-- Dashboard.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isAuth } from "../login/+page.svelte";
  import BankAccount from "../../controllers/BankAccount";
  import Navbar from "./Navbar.svelte";

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

  const account1 = new BankAccount("DBS", "74986123", "Jash", 3250);
  const account2 = new BankAccount("Standard Chartered", "31579082", "Jash", 7820);
  const account3 = new BankAccount("Citibank", "46820514", "Jash", 8470);
  const account4 = new BankAccount("HSBC", "92673108", "Jash", 1950);
  const account5 = new BankAccount("UOB", "57293410", "Jash", 5690);


  let bankAccounts = [
    {
      bankName: account1.getBankName(),
      accountNumber: account1.getAccountNumber(),
      deposits: account1.getBalance()
    },
    {
      bankName: account2.getBankName(),
      accountNumber: account2.getAccountNumber(),
      deposits: account2.getBalance()
    },
    {
      bankName: account3.getBankName(),
      accountNumber: account3.getAccountNumber(),
      deposits: account3.getBalance()
    },
    {
      bankName: account4.getBankName(),
      accountNumber: account4.getAccountNumber(),
      deposits: account4.getBalance()
    },
    {
      bankName: account5.getBankName(),
      accountNumber: account5.getAccountNumber(),
      deposits: account5.getBalance()
    },
    // ... add more accounts
  ];

  let totalAmount = bankAccounts.reduce((total, account) => total + parseInt(account.deposits), 0);

  function removeAccount(index: number) {
    bankAccounts = bankAccounts.filter((_, i) => i !== index);
    updateTotalAmount();
  }

  function addAccount() {
    // Logic to add a new bank account
    const bankName = prompt("Enter bank name");
    const accountNumber = prompt("Enter account number");
    const deposits = prompt("Enter deposits");
    const newAccount = new BankAccount(bankName, accountNumber, "Jash", parseInt(deposits));
    bankAccounts = [
      ...bankAccounts,
      {
        bankName: newAccount.getBankName(),
        accountNumber: newAccount.getAccountNumber(),
        deposits: newAccount.getBalance()
      }
    ];
  }

  function updateTotalAmount() {
    totalAmount = bankAccounts.reduce((total, account) => total + parseInt(account.deposits), 0);
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

<Navbar />
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
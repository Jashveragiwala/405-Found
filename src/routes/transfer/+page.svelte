<!-- Dashboard.svelte -->

<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { isAuth, username } from "../login/+page.svelte";
    import BankAccount from "../../controllers/BankAccount.js";
    import Navbar from "../main/Navbar.svelte";
    import allAccounts from "../main/+page.svelte";

    // console.log(isAuth);
    // console.log("HELLO");
    // function handleAuthentication() {
    //   if (isAuth) {
    //     console.log(isAuth);
    //     goto("../main");
    //   } else {
    //     console.log("Please log in first.");
    //     goto("../login");
    //   }
    // }
  
    // onMount(() => {
    //   handleAuthentication();
    // });

    var transactionHistory = [];

    function transferMoney(senderAccountNumber, targetAccountNumber, amount) {
        console.log("Transfer Money function called");
        console.log("Sender Account Number:", senderAccountNumber);
        console.log("Target Account Number:", targetAccountNumber);
        console.log("Transfer Amount:", amount);
        console.log("All Accounts:", allAccounts);
        for (var i = 0; i < allAccounts.length; i++) {
            if (allAccounts[i].getAccountNumber() === senderAccountNumber) {
                var senderAccount = allAccounts[i];
            }
            if (allAccounts[i].getAccountNumber() === targetAccountNumber) {
                var targetAccount = allAccounts[i];
            }
        }

        var amount = senderAccount.transfer(targetAccount, amount);
        if (amount === -1) {
            alert("Insufficient funds.");
            return;
        } else {
            alert("Transfer successful.");
        }

        var transaction = {
            senderAccountNumber: senderAccountNumber,
            targetAccountNumber: targetAccountNumber,
            amount: amount,
            date: new Date()
        }

        transactionHistory.push(transaction);

        // if (senderAccount.getBalance() < amount) {
        //     alert("Insufficient funds.");
        //     return;
        // }
        // senderAccount.withdraw(amount);
        // targetAccount.deposit(amount);
    }
    let senderAccountNumber = "";
    let targetAccountNumber = "";
    let transferAmount = "";

    function handleTransfer() {
        // Validate input values here
        console.log("Transfer button clicked");
        // Call the transferMoney() function with the input values
        transferMoney(senderAccountNumber, targetAccountNumber, parseFloat(transferAmount));
        
        // Clear input fields after transfer
        senderAccountNumber = "";
        targetAccountNumber = "";
        transferAmount = "";
        goto("../main");    
    }

    export {transactionHistory}
    
</script>
  
<Navbar />
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-4xl font-bold py-5">Transfer Page</h1>
      <div class="py-5 pr-2 font-semibold">
        <label for="sender-account" class="block text-sm">Sender Account Number:</label>
        <input id="sender-account" class="input input-bordered mt-1" type="text" bind:value={senderAccountNumber} />
      </div>
      <div class="py-5 pr-2 font-semibold">
        <label for="target-account" class="block text-sm">Target Account Number:</label>
        <input id="target-account" class="input input-bordered mt-1" type="text" bind:value={targetAccountNumber} />
      </div>
      <div class="py-5 pr-2 font-semibold">
        <label for="transfer-amount" class="block text-sm">Transfer Amount:</label>
        <input id="transfer-amount" class="input input-bordered mt-1" type="number" step="0.01" bind:value={transferAmount} />
      </div>
      <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" on:click={handleTransfer}>Transfer</button>
    </div>
  </div>
</div>


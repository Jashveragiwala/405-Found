<!-- Dashboard.svelte -->

<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { isAuth, username } from "../login/+page.svelte";
    import BankAccount from "../../controllers/BankAccount";
    import Navbar from "../main/Navbar.svelte";
    import { allAccounts } from "../main/+page.svelte";

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

    export {transactionHistory}
    
</script>
  
<Navbar />
<div>
  <h1>Transfer Page</h1>
  <!-- Implement UI to call transferMoney() function -->
</div>
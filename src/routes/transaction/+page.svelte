<!-- Dashboard.svelte

<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { isAuth, username } from "../login/+page.svelte";
    import Navbar from "../main/Navbar.svelte";
    import { transactionHistory } from "../transfer/+page.svelte";
  
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

    console.log(transactionHistory);

    var table = document.getElementById("transaction-history-table");

    for (var i = 0; i < transactionHistory.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        
        cell1.innerHTML = transactionHistory[i].senderAccountNumber;
        cell2.innerHTML = transactionHistory[i].targetAccountNumber;
        cell3.innerHTML = transactionHistory[i].amount;
        cell4.innerHTML = transactionHistory[i].date;
    }
</script>
  
  
<Navbar />
<div>
<h1>Transaction Page</h1>
<table id="transaction-history-table">
    <tr>
        <th>Sender Account Number</th>
        <th>Target Account Number</th>
        <th>Amount</th>
        <th>Date</th>
    </tr>
</table>     -->
<!-- Improve table UI -->
<!-- </div> -->

<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { isAuth, username } from "../login/+page.svelte";
    import Navbar from "../main/Navbar.svelte";
    import transactionHistory from "../transfer/+page.svelte";

    console.log(transactionHistory);

    var table = document.getElementById("transaction-history-table");

    for (var i = 0; i < transactionHistory.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        
        cell1.innerHTML = transactionHistory[i].senderAccountNumber;
        cell2.innerHTML = transactionHistory[i].targetAccountNumber;
        cell3.innerHTML = transactionHistory[i].amount;
        cell4.innerHTML = transactionHistory[i].date;
    }
</script>
<Navbar />
<div>
<h1>Transaction Page</h1>
<table id="transaction-history-table">
    <tr>
        <th>Sender Account Number</th>
        <th>Target Account Number</th>
        <th>Amount</th>
        <th>Date</th>
    </tr>
</table>
</div>

<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let data;
    const {user, prog} = data;
    let membershipNoField = "";
    let milesField = "";
    let lpPoints = 0;

    

function generateRandomTransacID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}
    
    function updateLPPoints() {
      if (Number.isInteger(milesField) && milesField > 0) {
        lpPoints = milesField * prog.Value;
      } else {
        lpPoints = 0;
      }
    }

    const member = $page.url.searchParams.get("member");
    const points = $page.url.searchParams.get("points");

    async function submitMemberNo() {
      if (new RegExp(prog.id_format).test(membershipNoField)) {
        const res = await fetch(`/api/lp_validation`, {
          method: "POST",
          body: JSON.stringify({
            lp_id: prog.lp_id,
            member: membershipNoField
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const {isValid} = await res.json();
        if (isValid) {
          window.location.href = `/${$page.params.user}/summary/${$page.params.programme}/redeem?member=${membershipNoField}`;
        } else {
          alert(`${prog.lp_id} member not found. Please contact loyalty programme if error persists.`)
        }        
      } else if (membershipNoField === "") {
        alert("Please enter a membership number.");
      } else {
        alert("Invalid membership number. Please enter a valid membership number.")
      }
    }

    function submitMiles() {
      if (Number.isInteger(milesField) && milesField > 0 && milesField <= user.points) {
        window.location.href = `/${$page.params.user}/summary/${$page.params.programme}/redeem?member=${member}&points=${milesField}`;
      } else if (milesField > user.points) {
        alert("Insufficient amount! Please enter a smaller amount of lpPoints to redeem.")
      } else {
        alert("Invalid amount entered. Please enter a valid amount of points.")
      }
    }

    async function submitRequest() {
      if (member === null || points === null) {
        alert("An error occured, please try again.")
      } else {
        const {lp_id: target_lp_id} = prog;
        const {source_member_id, first_name, last_name, email, phone} = user
        const transac_data = new Date().toISOString();

        const deductRes = await fetch('/api/bankapp/points', {
          method: "POST",
          body: JSON.stringify({
            ...user,
            points: user.points - parseInt(points)
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (deductRes.ok) {
          const reqRes = await fetch("/api/request",
          {
            method: "POST",
            body: JSON.stringify({
              transac_id: generateRandomTransacID(6),
              source_lp_id: "BANKAPP",
              target_lp_id,
              target_member_id: member,
              source_member_id,
              first_name,
              last_name,
              transac_data,
              amount: parseInt(points) * prog.Value,
              phone,
              email
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (reqRes.ok) {
            const {transac_id} = await reqRes.json()
            goto(`./success?transac_id=${transac_id}`)
          } else {
            goto("./fail")
          }
        } else {
          goto("./fail")
        }
      }
    }
</script>

<div class="hero min-h-screen">
    <div class="hero-content">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold">Redeem {prog.currency} </h1>
        <br>
        {#if member === null}
            <p>Enter your {prog.lp_name} membership number:</p>
            <br>
            <input
              type="text"
              bind:value={membershipNoField}
              class="border border-gray-300 rounded p-2 mb-5 w-5/6"
              placeholder={`${prog.lp_name} Membership Number`}
            />
            <br>
            <button class="btn" on:click={() => goto(`/${$page.params.user}/summary/${$page.params.programme}`)}>Back</button>
            <button class="btn btn-primary" on:click={submitMemberNo}>Next</button>
        {:else if points === null}
            <p>Your membership number: {member}</p>
            <br>
            <p>How many miles would you like to transfer?</p>
            <p>You have {user.points} miles left.</p>
            <br>
            <p>1 Mile will be converted to 1 {prog.currency}</p>
            <br>
            <input
              type="number"
              min="1"
              step="1"
              bind:value={milesField}
              on:input={(updateLPPoints)}
              class="border border-gray-300 rounded p-2 mb-5 w-5/12"
              placeholder="Miles to transfer"
            />
            <p>= {lpPoints} {prog.currency}</p>
            <br>
            <button class="btn" on:click={() => window.location.href = `/${$page.params.user}/summary/${$page.params.programme}/redeem`}>Back</button> <!-- goto() doesn't refresh the page -->
            <button class="btn btn-primary" on:click={submitMiles}>Next</button>
        {:else}
            <p>Confirm transfer of points to the following membership account?</p>
            <br>
            <p>Membership number: {member}</p>
            <p>Miles to redeem: {points}</p>
            <p>Points to receive: {parseInt(points) * prog.Value}</p>
            <br>
            <button class="btn" on:click={() => window.location.href = `/${$page.params.user}/summary/${$page.params.programme}/redeem?member=${member}`}>Back</button>
            <button class="btn btn-primary" on:click={submitRequest}>Confirm Transfer</button>
        {/if}
      </div>
    </div>
  </div>
  
  
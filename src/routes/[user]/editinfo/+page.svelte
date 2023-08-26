<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	export let data;
	const users = data.users;

	let {email, phone, first_name, last_name, password, notify_email, notify_phone} = users[0]

	console.log("edit page")
	export async function editInfo() {
		const ls = {
			email,
			phone,
			first_name,
			last_name,
			password,
			notify_email,
			notify_phone
		}
		// Check for empty fields
		if (!first_name || !last_name || !email || !phone || !password) {
			alert("Please fill in all the fields.");
			return;
		}

		// Check for invalid first name and last name
		if (!/^[A-Za-z]+$/.test(first_name)) {
			alert("Invalid first name. Please use letters only.");
			return;
		}

		if (!/^[A-Za-z]+$/.test(first_name) || !/^[A-Za-z]+$/.test(last_name)) {
			alert("Invalid last name. Please use letters only.");
			return;
		}

		// Check for invalid email format
		if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
			alert("Invalid email format. Please use the format 'example@example.com'.");
			return;
		}

		// Check for invalid phone number format
		if (!/^\d{8}$/.test(phone)) {
			alert("Invalid phone number. Please enter exactly 8 digits.");
			return;
		}

		// Check for invalid password format
		if (!/^\d{5}$/.test(password)) {
			alert("Invalid password. Please enter exactly 5 digits.");
			return;
		}
		console.log("Editing user info...")
		console.log("ls", ls)
		const postRes = post(ls);
		return {
			res: postRes
		}

		
	}
	let msg = ""
	export async function post(ls) {

		if ( Object.values(ls).some(val => val !== '') ) {
			console.log("Now in post function...")
			const queryParams = new URLSearchParams(users[0].source_member_id).toString();
  			const url_bUsers = `/api/bankapp/users?${queryParams}`;
			const url_Users = `/api/update_users?${queryParams}`;
        	const response_bUsers = await fetch(url_bUsers, {
            	method: 'POST',
            	body: JSON.stringify({new_data: ls, old_data: data.users[0]})
        	})
			const response_Users = await fetch(url_Users, {
            	method: 'POST',
            	body: JSON.stringify({new_data: ls, old_data: data.users[0]})
        	})
			if (!response_bUsers.ok) {
				const mes1 = await response_bUsers.text()
				msg = mes1
			}
			if (!response_Users.ok) {
				const mes2 = await response_Users.text()
				msg = mes2
			}
			if (msg === '') {
			alert("Change successful!")
			goto(`/${$page.params.user}/info`)
			}
		} else {
			msg = "Entries cannot be empty!"
		}
		return {
			msg
		}
    }

	
	export function handlePW() {
		const pwField = document.getElementById("passwd");
		const eye = document.getElementById("eye");
		pwField.type === "password" ? [pwField.type, eye.innerHTML] = ["text", "O"] : [pwField.type, eye.innerHTML] = ["password", "U"];
	}
</script>


<div class="hero min-h-screen">
  <div class="hero-content">
    <div class="max-w-md">
			<h1 class="text-4xl font-bold py-5">Edit Info</h1>
			<!-- <p> *Leaving inputs empty will make original value unchanged*</p> -->
			{#each users as info}
			<table >
				<tr>
					<td><p class="py-5 pr-2 font-semibold">First name:</p><br></td>
					<td><input id="firstname-input" class="p-1 border-2 border-slate-400 rounded-md" placeholder="First name" bind:value={first_name} data-testid="First name" /><p class="text-sm" data-testid="firstname-error">(Contains letters only)</p></td>
				</tr>
				<tr>
					<td><p class="py-5 pr-2 font-semibold">Last name:</p><br></td>
					<td><input id="lastname-input" class="p-1 border-2 border-slate-400 rounded-md" placeholder="Last name" bind:value={last_name} data-testid="Last name"/><p class="text-sm" data-testid="lastname-error">(Contains letters only)</p></td>
				</tr>
				<tr>
					<td><p class="py-5 pr-2 font-semibold">Username (email):</p><br></td>
					<td><input id="email-input" class="p-1 border-2 border-slate-400 rounded-md" placeholder="Username (email)" bind:value={email} data-testid="Email"/><p class="text-sm" data-testid="email-error">(Contains @ and .com)</p>
					<input class="p-1 border-2 border-slate-400 rounded-md" type="checkbox" bind:checked={notify_email}/><span class="p-2">Notify via Email</span></td>
				</tr>
				<tr>
					<td><p class="py-5 pr-2 font-semibold">Phone number:</p><br></td>
					<td><input id="contact-input" class="p-1 border-2 border-slate-400 rounded-md" placeholder="Contact" bind:value={phone} data-testid="Contact"/><p class="text-sm" data-testid="phone-error">(Contains exactly 8 digits)</p>
					<input class="p-1 border-2 border-slate-400 rounded-md" type="checkbox" bind:checked={notify_phone}/><span class="p-2">Notify via Phone</span></td>
				</tr>
				<tr>
					<td><p class="py-5 pr-2 font-semibold">Password:</p><br></td>
					<td><input id="password-input" class="p-1 border-2 border-slate-400 rounded-md" type="password" placeholder="Password" bind:value={password} data-testid="Password"/><p class="text-sm" data-testid="password-error">(Contains exactly 5 digits) <span id="eye" class=" font-bold text-blue-500" on:click={handlePW}>U</span></p></td>
				</tr>
			</table>
			<button class= "btn btn-primary" on:click="{() => editInfo(users)}">Update User Info</button>
			{#if msg}
    			<p data-testid="error-msg">{msg}</p>
			{/if}
			<button class="btn" data-testid="Cancel" on:click="{() => goto(`/${info.source_member_id}/info/`)}">Cancel</button>
			{/each}
    </div>
  </div>
</div>

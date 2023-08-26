<script context="module" lang="ts">
	import vault from '$lib/assets/bankapp/vault.svg';

	export async function handleSignUp() {
		goto('../signup');
	}

	export async function handleLogin(username: String, password: String) {
		console.log(`Attempting to log in as ${username}...`);

		try {
			const res = await fetch('/api/bankapp/userAuth', {
				method: 'POST',
				body: JSON.stringify({
					username,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			console.log(res.ok ? 'API call successfully returned' : 'API call failed');
			let response = await res.json();
			console.log(response.message);
			if (response.loginSuccess) {
				goto(`/${response.userID}`);
			} else {
				return `Login failed: ${response.message}`;
			}
		} catch (error) {
			return error;
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let username = '';
	let password = '';

	let login_error: String | null = null;

	onMount(() => {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				document.getElementById('login-btn')?.click();
			}
		});
	});

	async function login() {
		if (username === '' || password === '') {
			login_error = 'Empty username/password';
			return;
		}

		login_error = (await handleLogin(username, password)) as String;
	}
</script>

{#if login_error}
	<div class="alert alert-error fixed">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>{login_error}</span>
	</div>
{/if}

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse items-end">
		<div class="max-w-sm lg:max-w-full">
			<img src={vault} class="shadow-2xl" alt="Person withdrawing money from a giant vault" />
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">Bank App</h1>
					<div class="my-5">
						<div class="form-control">
							<label class="label" for="username_input">
								<span class="label-text" data-testid="username-error">Username (email)</span>
							</label>
							<input
								id="username_input"
								type="text"
								placeholder="Enter your username"
								class={'input input-bordered' +
									(login_error && username === '' ? ' input-error' : '')}
								bind:value={username}
							/>
						</div>
						<div class="form-control">
							<label class="label" for="password_input">
								<span class="label-text" data-testid="password-error">Password</span>
							</label>
							<input
								id="password_input"
								type="password"
								placeholder="Enter your password"
								class={'input input-bordered' +
									(login_error && password === '' ? ' input-error' : '')}
								bind:value={password}
							/>
						</div>
					</div>
					<button id="login-btn" class="btn btn-primary" on:click={login}>Login</button>
					<button id="signup-btn" class="btn" on:click={handleSignUp}>Sign Up</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@import '../../app.css';
</style>

<script lang="ts">
	import { page } from '$app/stores';

	let user = $page.params.user;

	const navs = [
		{
			label: 'Dashboard',
			href: `/${user}`
		},
		{
			label: 'Loyalty Programmes',
			href: `/${user}/summary`
		},
		{
			label: 'Notifications',
			href: `/${user}/notifs`
		},
		{
			label: 'User Info',
			href: `/${user}/info`
		}
	];
</script>

<header>
	<div class="navbar bg-base-200 shadow-lg fixed">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="-1" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/></svg
					>
				</label>
				<ul
					tabindex="-1"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					{#each navs as { label, href }}
						<li class:active={$page.url.pathname === href}>
							<a sveltekit:prefetch {href}>{label}</a>
						</li>
					{/each}
				</ul>
			</div>
			<a class="btn btn-ghost normal-case text-xl" href={`/${user}`}>Bank App</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal p-0">
				{#each navs as { label, href }}
					<li class:active={$page.url.pathname === href}>
						<a sveltekit:prefetch {href}>{label}</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="navbar-end" />
	</div>
</header>

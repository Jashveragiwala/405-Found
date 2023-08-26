<script lang="ts">
	import { goto } from '$app/navigation';
	import IconMsg from '~icons/ri/message-2-fill';
	import IconMail from '~icons/ri/mail-fill';

	export let data;
	let { user } = data;
</script>

<div class="hero">
	<div class="hero-content">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Hello {user.first_name}!</h1>
			<div class="stats bg-base-200 text-primary-content my-5">
				<div class="stat bg-primary">
					<div class="stat-title">Miles</div>
					<div class="stat-value">{user.points}</div>
					<div class="stat-actions">
						<button
							class="btn btn-success"
							on:click={() => goto(`/${user.source_member_id}/summary`)}>Exchange Miles</button
						>
						<button class="btn btn-secondary"
						on:click={() => goto(`/${user.source_member_id}/addmiles`)}>Add Miles</button>
					</div>
				</div>

				<div class="stat">
					<div class="stat-title">Notifications</div>
					<div class="stat-value flex flex-row space-x-2 -mb-1.5">
						<div class="indicator">
							<span
								class={'mb-1.5 mr-1.5 indicator-item indicator-bottom badge ' +
									(user.notify_phone ? 'badge-success' : 'badge-ghost')}
							/>
							<IconMsg class="text-info-content" />
						</div>
						<div class="indicator">
							<span
								class={'mb-1.5 mr-1.5 indicator-item indicator-bottom badge ' +
									(user.notify_email ? 'badge-success' : 'badge-secondary')}
							/>
							<IconMail class={'text-info-content ' + (user.notify_email ? '' : 'opacity-75')} />
						</div>
					</div>
					<div class="stat-actions">
						<button
							class="btn btn-secondary"
							on:click={() => goto(`/${user.source_member_id}/notifs`)}>View All</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

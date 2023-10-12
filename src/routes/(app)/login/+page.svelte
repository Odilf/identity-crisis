<script lang="ts">
	import { enhance } from '$app/forms';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';

	export let data;
	export let form;
</script>

<TabGroup>
	<Tab bind:group={data.mode} name="login" value="login">Login</Tab>
	<Tab bind:group={data.mode} name="register" value="register">Register</Tab>

	<svelte:fragment slot="panel">
		{#if form?.error}
			<aside class="alert variant-soft-error my-8" transition:slide>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</svg>
				</div>
				<div class="alert-message">
					<h3 class="h3">Error while logging in:</h3>
					<p>{form?.error.message}</p>
				</div>
			</aside>
		{/if}

		<form class="flex flex-col gap-2" method="post" action="?/{data.mode}" use:enhance>
			<label class="label" for="email"> Email </label>
			<input class="input" type="email" name="email" />

			{#if data.mode === 'register'}
				<label class="label" for="username"> Username </label>
				<input class="input" type="text" name="username" />
			{/if}

			<label class="label" for="password"> Password </label>
			<input class="input" type="password" name="password" />

			<button class="btn variant-form-material" type="submit"> Log in </button>
		</form>
	</svelte:fragment>
</TabGroup>

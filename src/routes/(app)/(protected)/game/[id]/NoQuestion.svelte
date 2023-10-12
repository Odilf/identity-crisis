<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import LinkIcon from './LinkIcon.svelte';

	export let players: { username: string }[];
	export let isHost: boolean;
</script>

<main class="flex flex-col h-full">
	<button
		class="btn variant-ghost-primary mb-4"
		on:click={() => navigator.clipboard.writeText($page.url.toString())}
	>
		<LinkIcon />
		<span class="ml-1 h1">Copy game link</span>
	</button>

	<div class="flex-1">
		<h1 class="text-xl font-bold">Connected players</h1>
		<ul>
			{#each players as profile}
				<li transition:fly={{ y: 200 }} class="font-light">{profile.username}</li>
			{/each}
		</ul>
	</div>

	<form method="post" use:enhance action="?/getQuestion" class="w-full">
		{#if isHost}
			<button class="btn variant-filled-primary w-full h1 text-3xl mb-4"> Start </button>
		{/if}
		<button
			formaction={isHost ? '?/cancelGame' : '?/leaveGame'}
			class="btn variant-soft-error w-full"
		>
			{isHost ? 'Cancel game' : 'Leave game'}
		</button>
	</form>
</main>

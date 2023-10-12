<script lang="ts">
	export let data;
</script>

<main class="grid content-center h-screen w-screen text-center">
	<h1 class="h1">identity crisis</h1>

	<div class="p-4">
		{#if data.session}
			<a href="/game" class="btn variant-filled-primary"> Game </a>
			<a href="/profile" class="btn variant-filled-primary"> Profile </a>
		{:else}
			<a href="/login" class="btn variant-filled-primary"> Log in/register </a>
		{/if}
	</div>
</main>

<style>
	h1 {
		font-size: 20vw;
		line-height: 1;
	}
</style>

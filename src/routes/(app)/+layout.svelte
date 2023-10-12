<script>
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar class="flex flex-row">
			<a class="anchor" slot="lead" href="/"> Home </a>
			<a class="anchor" slot="trail" href="/profile"> Profile </a>
		</AppBar>
	</svelte:fragment>
	<main class="max-w-xl mx-auto px-4 py-4 h-full">
		<slot />
	</main>
</AppShell>

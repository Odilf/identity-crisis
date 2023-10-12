<script lang="ts">
	export let data;
</script>

<h1 class="h1 py-4">{data.profile.username}</h1>

<form action="?/logout" method="post">
	<button
		on:click={async () => await data.supabase.auth.signOut()}
		class="btn variant-filled-primary"
	>
		Log out
	</button>
</form>

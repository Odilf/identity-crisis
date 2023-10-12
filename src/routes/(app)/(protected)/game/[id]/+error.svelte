<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="h1">{$page.error?.message}</h1>

<a href="/" class="anchor text-xl"> Go back </a>

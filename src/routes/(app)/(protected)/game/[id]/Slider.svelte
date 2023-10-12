<script lang="ts">
	export let value: number = 0.5;
	export let name: string | undefined = undefined;
	export let disabled = false;
</script>

<input
	type="range"
	{name}
	id={name}
	class="h-10 variant-filled-primary"
	bind:value
	style:--value={value}
	min="0"
	max="1"
	step="0.0001"
	{disabled}
/>

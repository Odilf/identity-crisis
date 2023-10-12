<script lang="ts">
	import { enhance } from '$app/forms';
	import Slider from './Slider.svelte';

	export let isReady: boolean;
	export let question: {
		prompt: string;
		left: string;
		right: string;
	};

	export let value: number;
</script>

<form
	class="h-full flex flex-col"
	method="post"
	action={isReady ? '?/retractAnswer' : '?/submitAnswer'}
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<div class="flex-1" />

	<h1 class="h1 text-center">{question.prompt}</h1>
	<div>
		<div class="font-light w-full">{question.left ?? 'Totally'}</div>
		<Slider {value} name="answer" />
		<div class="font-light w-full text-right">{question.right ?? 'Not at all'}</div>
	</div>

	<div class="flex-1" />

	<button class="btn variant-filled w-fit ml-auto transition-opacity" class:opacity-50={isReady}>
		{isReady ? 'Waiting for other players' : 'Confirm'}
	</button>
</form>

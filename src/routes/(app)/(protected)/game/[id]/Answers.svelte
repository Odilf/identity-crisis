<script lang="ts">
	import unwrap from 'ts-unwrap';
	import Slider from './Slider.svelte';
	import { enhance } from '$app/forms';

	export let target: {
		id: string;
		username: string;
	};

	export let answers: {
		player_id: string;
		username: string;
		value: number;
	}[];

	export let isHost: boolean;

	export let question: {
		prompt: string;
		left: string;
		right: string;
	};

	$: target_answer = unwrap(answers.find((answer) => answer.player_id === target.id));
	$: player_answers = answers
		.filter((answer) => answer.player_id !== target.id)
		.map((answer) => ({
			...answer,
			match: (1 - Math.abs(answer.value - target_answer.value)) ** 2
		}))
		.sort((a, b) => a.match - b.match);
</script>

<main class="flex flex-col h-full">
	<h1 class="h1 text-5xl pb-8"> {question.prompt} </h1>

	<h2 class="text-3xl font-bold">What {target.username} thinks of themselves</h2>
	<Slider value={target_answer.value} disabled />

	<h3 class="text-xl font-bold pt-4 pb-2">What other players think of {target.username}</h3>
	{#each player_answers as answer}
		<div>
			<div class="font-light">
				{answer.username} ({(answer.match * 100).toFixed(2)}% match)
			</div>
			<Slider value={answer.value} disabled />
		</div>
	{/each}

	<div class="flex-1" />


	{#if isHost}
		<form method="post" use:enhance action="?/getQuestion" class="w-full">
			<button class="btn variant-filled-primary w-full h1 text-3xl mb-4"> Next question </button>
			<button formaction="?/finishGame" class="btn variant-soft-error w-full"> Finish game </button>
		</form>
	{/if}
</main>

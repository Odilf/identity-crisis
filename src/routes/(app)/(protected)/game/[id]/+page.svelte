<script lang="ts">
	import NoQuestion from './NoQuestion.svelte';
	import { enhance } from '$app/forms';
	import unwrap from 'ts-unwrap';
	import { invalidate } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import EnterResult from './EnterAnswer.svelte';
	import Answers from './Answers.svelte';

	export let data;

	$: isHost = data.game.host_id === data.profile.id;
	$: players = data.answers.map((answer) => ({
		username: answer.player_username as string
	}));

	$: player_answer = unwrap(data.answers.find((answer) => answer.player_id === data.profile.id));
	$: isReady = player_answer.answer_value !== null;

	$: allAnswersSubmitted =
		data.answers.filter((answer) => answer.answer_value !== null).length === data.answers.length;

	let value =
		data.answers.find((answer) => answer.player_id === data.profile.id)?.answer_value ?? 0.5;

	// // TODO: Change this to use messages instead
	// const channel = data.supabase.realtime
	// 	.channel(`game:${data.game.game_id}`)
	// 	.on(
	// 		'postgres_changes',
	// 		{
	// 			event: 'INSERT',
	// 			schema: 'public',
	// 			table: 'answers'
	// 			// filter: `game_id=eq.${data.game.game_id}`
	// 		},
	// 		(_payload) => {
	// 			console.log('Received update');

	// 			invalidate(`game:${data.game.game_id}`);
	// 		}
	// 	)
	// 	.subscribe();

	// const channel = ;

	const channel = data.supabase
		.channel(`game:${data.game.game_id}`)
		.on(
			'broadcast',
			{ event: 'newQuestion' },
			(payload) => {
				console.log('Received update (new question)');
				invalidate(`game:${data.game.game_id}`);
			}
		)
		.on('broadcast', { event: 'answerModified' }, (payload) => {
			console.log('Received update (new answer)');
			invalidate(`game:${data.game.game_id}`);
		})
		.on(
			'broadcast',
			{ event: 'playerJoined' },
			(payload) => {
				console.log('Received update (new answer)');
				invalidate(`game:${data.game.game_id}`);
			}
		)
		.on(
			'broadcast',
			{ event: 'playerLeft' },
			(payload) => {
				console.log('Received update (new answer)');
				invalidate(`game:${data.game.game_id}`);
			}
		)
		.on(
			'broadcast',
			{ event: 'gameFinished' },
			(payload) => {
				console.log('Received update (new answer)');
				invalidate(`game:${data.game.game_id}`);
			}
		)
		.subscribe();

	onDestroy(() => {
		channel.unsubscribe();
	});
</script>

{#if data.game.question_id === null}
	<NoQuestion {players} {isHost} />
{:else if !allAnswersSubmitted}
	<EnterResult
		{isReady}
		{value}
		question={{
			prompt: unwrap(data.game.question_prompt),
			left: unwrap(data.game.question_left),
			right: unwrap(data.game.question_right)
		}}
		target_player_username={unwrap(data.game.target_player_username)}
	/>
{:else}
	<Answers
		answers={data.answers.map((answer) => ({
			player_id: unwrap(answer.player_id),
			username: unwrap(answer.player_username),
			value: unwrap(answer.answer_value)
		}))}
		target={{
			id: unwrap(data.game.target_player_id),
			username: unwrap(data.game.target_player_username)
		}}
		{isHost}
		question={{
			prompt: unwrap(data.game.question_prompt),
			left: unwrap(data.game.question_left),
			right: unwrap(data.game.question_right)
		}}
	/>
{/if}

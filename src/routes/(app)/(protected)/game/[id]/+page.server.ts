import { handleSupabase, handleSupabaseAllowNull } from '$lib/db/utils.js';
import { error } from '@sveltejs/kit';
import { _broadcast } from './+page';


export const actions = {
	getQuestion: async ({ params, locals: { supabase } }) => {
		// TODO: Skip already answered questions
		const questionPromise = supabase.from('random_questions').select().limit(1).single();
		const targetPlayerPromise = supabase
			.from('random_players')
			.select('id')
			.eq('game_id', params.id)
			.select()
			.limit(1)
			.single();

		const question = handleSupabase(await questionPromise);
		const targetPlayer = handleSupabase(await targetPlayerPromise);

		const updateGame = supabase
			.from('games')
			.update({
				question: question.id,
				target_player: targetPlayer.id
			})
			.eq('id', params.id)
			.select()
			.single();

		handleSupabase(await updateGame);

		_broadcast(supabase, params.id, 'newQuestion');

		return {
			question
		};
	},

	finishGame: async ({ params, locals: { supabase } }) => {
		const updateGame = supabase.from('games').delete().eq('id', params.id);

		_broadcast(supabase, params.id, 'gameFinished');

		handleSupabaseAllowNull(await updateGame);
	},

	submitAnswer: async ({ params, locals: { supabase, getSession }, request }) => {
		const session = await getSession();

		if (session === null) {
			throw error(401, 'Unauthorized');
		}

		let answerValue: number;

		try {
			answerValue = parseFloat((await request.formData()).get('answer') as string);
		} catch (err) {
			throw error(400, `Invalid value: ${err}`);
		}

		const currentGamePromise = supabase.from('games').select().eq('id', params.id).single();

		const game = handleSupabase(await currentGamePromise);

		if (!game.target_player || !game.question) {
			throw error(500, 'Target player or question is missing');
		}

		const insertAnswerPromise = supabase.from('answers').insert({
			from: session.user.id,
			directed_to: game.target_player,
			value: answerValue,
			question: game.question
		});

		_broadcast(supabase, params.id, 'answerModified');

		handleSupabaseAllowNull(await insertAnswerPromise);
	},

	retractAnswer: async ({ params, locals: { supabase, getSession } }) => {
		const currentGamePromise = supabase.from('games').select().eq('id', params.id).single();
		const session = await getSession();

		if (session === null) {
			throw error(401, 'Unauthorized');
		}

		const game = handleSupabase(await currentGamePromise);

		const deleteAnswerPromise = supabase
			.from('answers')
			.delete()
			.eq('from', session.user.id)
			.eq('question', game.question ?? '')
			.eq('directed_to', game.target_player ?? '');

		_broadcast(supabase, params.id, 'answerModified');

		handleSupabaseAllowNull(await deleteAnswerPromise);
	},

	leaveGame: async ({ params, locals: { supabase } }) => {
		const removePlayerPromsie = supabase.from('players_game').delete().eq('game_id', params.id).eq('player_id', params.id);
		_broadcast(supabase, params.id, 'playerLeft');

		handleSupabaseAllowNull(await removePlayerPromsie);
	},

	cancelGame: async ({ locals: { supabase }, params }) => {
		const deleteGamePromise = supabase.from('games').delete().eq('id', params.id);		
		_broadcast(supabase, params.id, 'gameFinished');

		handleSupabaseAllowNull(await deleteGamePromise);
	}
};

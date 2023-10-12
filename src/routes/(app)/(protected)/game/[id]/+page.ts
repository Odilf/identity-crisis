import type { Supabase } from '$lib/db/types';
import { handleSupabase, handleSupabaseAllowNull } from '$lib/db/utils.js';
import { redirect } from '@sveltejs/kit';

export async function _broadcast(supabase: Supabase, gameId: string, event: string) {
	// const channel = supabase.channel(`game:${gameId}`);

	// const result = await channel.send({
	// 	type: 'broadcast',
	// 	event,
	// 	payload: {
	// 		poopoo: "5"
	// 	}
	// });

	// console.log(result);
	// console.log(JSON.stringify(result));

	// supabase.removeChannel(channel);

	const channel = supabase.channel(`game:${gameId}`);

	const caca = new Promise((resolve, reject) => {
		channel.subscribe(async (status) => {
			if (status !== 	'SUBSCRIBED') {
				return null;
			}

			const result = await channel.send({
				type: 'broadcast',
				event,
				payload: {
					poopoo: "5"
				}
			})

			console.log(result);
			

			channel.unsubscribe();

			resolve(null);
		})
	})

	await caca;
}


export async function load({ parent, params: { id: gameId }, depends }) {
	const { profile, supabase } = await parent();

	const currentGamePromise = supabase
		.from('players_game')
		.select()
		.eq('player_id', profile.id)
		.maybeSingle();

	const gamePromise = supabase.from('game_data').select().eq('game_id', gameId).maybeSingle();
	const gameAnswersPromise = supabase.from('game_answers').select().eq('game_id', gameId);

	const currentGame = handleSupabaseAllowNull(await currentGamePromise);

	// Redirect to current game if player is in another game
	if (currentGame && currentGame.game_id !== gameId) {
		console.log('Player is in another game, redirecting', currentGame.game_id);
		throw redirect(303, `/game/${currentGame.game_id}`);
	}

	const game = handleSupabaseAllowNull(await gamePromise);

	// Redirect to game home if game does not exist (invalid link, basically)
	if (!game) {
		console.log("Game doesn't exist", gameId);
		throw redirect(303, `/game`);
	}

	// Join player to game if he isn't in one already
	if (!currentGame) {
		_broadcast(supabase, gameId, 'playerJoined')
		handleSupabaseAllowNull(
			await supabase.from('players_game').insert({ player_id: profile.id, game_id: gameId })
		);
	}

	depends(`game:${game.game_id}`);

	const answers = handleSupabase(await gameAnswersPromise);

	return {
		game,
		answers
	};
}

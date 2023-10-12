import { handleSupabase, handleSupabaseAllowNull } from '$lib/db/utils.js';
import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { profile, supabase } = await parent();
	const playerGamePromise = supabase
		.from('players_game')
		.select()
		.eq('player_id', profile.id)
		.maybeSingle();

	const playerGame = handleSupabaseAllowNull(await playerGamePromise);

	if (playerGame !== null) {
		throw redirect(303, `/game/${playerGame.game_id}`);
	}
}

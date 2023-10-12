import { invalidate } from '$app/navigation';
import { handleSupabase, handleSupabaseAllowNull } from '$lib/db/utils.js';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(400, 'You must be logged in to create a game');
		}

		const { data: game, error: insertError } = await supabase
			.from('games')
			.insert({
				host: session.user.id
			})
			.select()
			.single();

		if (insertError) {
			throw error(500, { message: insertError.message });
		}

		if (!game) {
			throw error(500, { message: 'No data returned' });
		}

		const playerGamePromise = supabase.from('players_game').insert({
			game_id: game.id,
			player_id: session.user.id
		});

		handleSupabaseAllowNull(await playerGamePromise);

		throw redirect(303, `/game/${game.id}`);
	}
};

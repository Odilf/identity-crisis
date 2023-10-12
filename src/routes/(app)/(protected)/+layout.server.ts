import { redirect, error as skError } from '@sveltejs/kit';

export async function load({ parent, url, locals: { supabase } }) {
	return {
		caca: 5
	};
}

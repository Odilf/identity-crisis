import { dev } from '$app/environment';
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_ANON_KEY_DEV,
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_URL_DEV
} from '$env/static/public';
import type { Supabase } from '$lib/db/types.js';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase: Supabase = createSupabaseLoadClient({
		supabaseUrl: dev ? PUBLIC_SUPABASE_URL_DEV : PUBLIC_SUPABASE_URL,
		supabaseKey: dev ? PUBLIC_SUPABASE_ANON_KEY_DEV : PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};

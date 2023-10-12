import { dev } from '$app/environment';
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_ANON_KEY_DEV,
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_URL_DEV
} from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

export function handle({ event, resolve }) {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: dev ? PUBLIC_SUPABASE_URL_DEV : PUBLIC_SUPABASE_URL,
		supabaseKey: dev ? PUBLIC_SUPABASE_ANON_KEY_DEV : PUBLIC_SUPABASE_ANON_KEY,
		event,
		cookieOptions: {
			secure: dev ? false : true
		}
	});

	/**
	 * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
}

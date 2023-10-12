import { redirect, error as skError } from '@sveltejs/kit';

export async function load({ parent, url }) {
	const { session, supabase } = await parent();

	if (!session) {
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
	}

	const { data: profile, error } = await supabase
		.from('profiles')
		.select()
		.eq('id', session.user.id)
		.single();

	if (error) {
		throw skError(404, error);
	}

	if (!profile) {
		throw skError(500, { message: 'Profile seems to be missing' });
	}

	return { session, profile };
}

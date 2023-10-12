import { redirect } from '@sveltejs/kit';

export async function load({ url, parent }) {
	const registering = url.searchParams.get('register');

	const { session } = await parent();

	if (session) {
		throw redirect(303, '/profile');
	}

	return { mode: registering ? ('register' as const) : ('login' as const) };
}

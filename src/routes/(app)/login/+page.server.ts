import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ url, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error || !data) {
			return fail(404, { error: { message: error?.message } });
		}

		complete(url.searchParams.get('redirectTo'));
	},

	register: async ({ url, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

		if (!data.user) {
			return fail(500, { error: { message: 'Email autoconfirm seems to be off' } });
		}

		const { error: updateError } = await supabase
			.from('profiles')
			.insert({ id: data.user.id, username });

		if (signUpError || !data) {
			return fail(404, { error: { message: signUpError?.message } });
		}

		if (updateError) {
			return fail(404, { error: { message: updateError?.message } });
		}

		complete(url.searchParams.get('redirectTo'));
	}
};

function complete(redirectTo: string | null) {
	if (redirectTo) {
		throw redirect(303, decodeURIComponent(redirectTo));
	} else {
		throw redirect(303, '/profile');
	}
}

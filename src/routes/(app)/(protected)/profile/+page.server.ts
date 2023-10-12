export const actions = {
	logout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
	}
};

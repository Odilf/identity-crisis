import type { PostgrestError, PostgrestResponse } from '@supabase/supabase-js';
import { fail, error as skError } from '@sveltejs/kit';

export function handleSupabaseAsFail<T>({
	data,
	error
}: {
	data: T;
	error: PostgrestError | null;
}) {
	if (error) {
		return fail(404, { error: { message: error?.message } });
	}

	return data;
}

export function handleSupabaseAllowNull<T>({
	data,
	error
}: {
	data: T;
	error: PostgrestError | null;
}) {
	if (error) {
		throw skError(404, error.message + error.details);
	}

	return data;
}

export function handleSupabase<T>({ data, error }: { data: T; error: PostgrestError | null }) {
	if (error) {
		throw skError(404, error.message + error.details);
	}

	if (data === null) {
		throw skError(404, 'Data is null');
	}

	return data;
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './generatedTypes';

export type Supabase = SupabaseClient<Database>;

export type Table<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;

export type Profile = Table<'profiles'>;

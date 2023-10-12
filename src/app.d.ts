import type { Session } from '@supabase/supabase-js';
import type { Supabase } from '$lib/db/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: Supabase;
			getSession(): Promise<Session | null>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

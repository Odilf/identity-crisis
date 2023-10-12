export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			answers: {
				Row: {
					directed_to: string;
					from: string;
					question: number;
					value: number;
				};
				Insert: {
					directed_to: string;
					from: string;
					question: number;
					value: number;
				};
				Update: {
					directed_to?: string;
					from?: string;
					question?: number;
					value?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'answers_directed_to_fkey';
						columns: ['directed_to'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'answers_from_fkey';
						columns: ['from'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'answers_question_fkey';
						columns: ['question'];
						referencedRelation: 'questions';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'answers_question_fkey';
						columns: ['question'];
						referencedRelation: 'random_questions';
						referencedColumns: ['id'];
					}
				];
			};
			games: {
				Row: {
					created_at: string;
					host: string;
					id: string;
					question: number | null;
					target_player: string | null;
				};
				Insert: {
					created_at?: string;
					host: string;
					id?: string;
					question?: number | null;
					target_player?: string | null;
				};
				Update: {
					created_at?: string;
					host?: string;
					id?: string;
					question?: number | null;
					target_player?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'games_host_fkey';
						columns: ['host'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_question_fkey';
						columns: ['question'];
						referencedRelation: 'questions';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_question_fkey';
						columns: ['question'];
						referencedRelation: 'random_questions';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_target_player_fkey';
						columns: ['target_player'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_target_player_fkey';
						columns: ['target_player'];
						referencedRelation: 'random_players';
						referencedColumns: ['id'];
					}
				];
			};
			players_game: {
				Row: {
					game_id: string;
					is_ready: boolean;
					player_id: string;
				};
				Insert: {
					game_id: string;
					is_ready?: boolean;
					player_id: string;
				};
				Update: {
					game_id?: string;
					is_ready?: boolean;
					player_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'players_game_game_id_fkey';
						columns: ['game_id'];
						referencedRelation: 'games';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'players_game_game_id_fkey';
						columns: ['game_id'];
						referencedRelation: 'game_answers';
						referencedColumns: ['game_id'];
					},
					{
						foreignKeyName: 'players_game_game_id_fkey';
						columns: ['game_id'];
						referencedRelation: 'game_data';
						referencedColumns: ['game_id'];
					},
					{
						foreignKeyName: 'players_game_game_id_fkey';
						columns: ['game_id'];
						referencedRelation: 'random_players';
						referencedColumns: ['game_id'];
					},
					{
						foreignKeyName: 'players_game_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'players_game_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'random_players';
						referencedColumns: ['id'];
					}
				];
			};
			profiles: {
				Row: {
					id: string;
					username: string;
				};
				Insert: {
					id: string;
					username: string;
				};
				Update: {
					id?: string;
					username?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			questions: {
				Row: {
					author: string | null;
					id: number;
					left_text: string | null;
					prompt: string;
					right_text: string | null;
				};
				Insert: {
					author?: string | null;
					id?: number;
					left_text?: string | null;
					prompt: string;
					right_text?: string | null;
				};
				Update: {
					author?: string | null;
					id?: number;
					left_text?: string | null;
					prompt?: string;
					right_text?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'questions_author_fkey';
						columns: ['author'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			game_answers: {
				Row: {
					answer_value: number | null;
					game_id: string | null;
					player_id: string | null;
					player_username: string | null;
					target_player_id: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'games_target_player_fkey';
						columns: ['target_player_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_target_player_fkey';
						columns: ['target_player_id'];
						referencedRelation: 'random_players';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'players_game_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'players_game_player_id_fkey';
						columns: ['player_id'];
						referencedRelation: 'random_players';
						referencedColumns: ['id'];
					}
				];
			};
			game_data: {
				Row: {
					game_id: string | null;
					host_id: string | null;
					host_username: string | null;
					question_id: number | null;
					question_left: string | null;
					question_prompt: string | null;
					question_right: string | null;
					target_player_id: string | null;
					target_player_username: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'games_host_fkey';
						columns: ['host_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_question_fkey';
						columns: ['question_id'];
						referencedRelation: 'questions';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_question_fkey';
						columns: ['question_id'];
						referencedRelation: 'random_questions';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_target_player_fkey';
						columns: ['target_player_id'];
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'games_target_player_fkey';
						columns: ['target_player_id'];
						referencedRelation: 'random_players';
						referencedColumns: ['id'];
					}
				];
			};
			random_players: {
				Row: {
					game_id: string | null;
					id: string | null;
					username: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			random_questions: {
				Row: {
					author: string | null;
					id: number | null;
					left_text: string | null;
					prompt: string | null;
					right_text: string | null;
				};
				Insert: {
					author?: string | null;
					id?: number | null;
					left_text?: string | null;
					prompt?: string | null;
					right_text?: string | null;
				};
				Update: {
					author?: string | null;
					id?: number | null;
					left_text?: string | null;
					prompt?: string | null;
					right_text?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'questions_author_fkey';
						columns: ['author'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'buckets_owner_fkey';
						columns: ['owner'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

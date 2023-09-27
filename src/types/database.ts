export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            books: {
                Row: {
                    cover: string;
                    created_at: string;
                    date: string;
                    id: string;
                    name: string;
                    nanoid: string;
                };
                Insert: {
                    cover: string;
                    created_at?: string;
                    date: string;
                    id?: string;
                    name: string;
                    nanoid: string;
                };
                Update: {
                    cover?: string;
                    created_at?: string;
                    date?: string;
                    id?: string;
                    name?: string;
                    nanoid?: string;
                };
                Relationships: [];
            };
            tracks: {
                Row: {
                    book_id: string;
                    created_at: string;
                    id: number;
                    name: string | null;
                    nanoid: string;
                    url: string;
                };
                Insert: {
                    book_id: string;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    nanoid: string;
                    url: string;
                };
                Update: {
                    book_id?: string;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                    nanoid?: string;
                    url?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'tracks_book_id_fkey';
                        columns: ['book_id'];
                        referencedRelation: 'books';
                        referencedColumns: ['id'];
                    },
                ];
            };
            users: {
                Row: {
                    avatar: string | null;
                    created_at: string;
                    id: string;
                    is_admin: boolean | null;
                    name: string | null;
                };
                Insert: {
                    avatar?: string | null;
                    created_at?: string;
                    id: string;
                    is_admin?: boolean | null;
                    name?: string | null;
                };
                Update: {
                    avatar?: string | null;
                    created_at?: string;
                    id?: string;
                    is_admin?: boolean | null;
                    name?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'users_id_fkey';
                        columns: ['id'];
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
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
}

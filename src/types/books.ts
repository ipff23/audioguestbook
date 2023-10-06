import { type Database } from '@/types/database';

export type Book = Database['public']['Tables']['books']['Row'];
export type Track = Database['public']['Tables']['tracks']['Row'];

export interface SupabaseBook {
    data: Book & { tracks: Track[] };
}

export enum TrackType {
    Stored,
    New,
}

export interface EditableTrack
    extends Omit<Track, 'id' | 'book_id' | 'created_at' | 'duration' | 'hash' | 'index'> {
    type: TrackType;
    file?: File;
}

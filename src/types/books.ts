import { type Database } from '../types/database';

export type Book = Database['public']['Tables']['books']['Row'];
export type Track = Database['public']['Tables']['tracks']['Row'];

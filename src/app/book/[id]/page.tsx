import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { type Track, type SupabaseBook } from '@/types/books';

import BookClient from './book-client';

export const dynamic = 'force-dynamic';

export interface BookProps {
    params: { id: string };
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Book({ params: { id }, searchParams }: BookProps) {
    const supabase = createServerComponentClient({ cookies });
    const { data: book } = (await supabase
        .from('books')
        .select(`*, tracks(*)`)
        .eq('nanoid', id)
        .single()) as SupabaseBook;

    const tracks = book.tracks.sort((a: Track, b: Track) => a.index! - b.index!);

    const debug = searchParams?.debug !== undefined;

    return <BookClient debug={debug} book={book} tracks={tracks} />;
}

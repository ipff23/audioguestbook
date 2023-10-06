import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { type Track } from '@/types/books';
import MainContainer from '@/components/main-container';
import MainHeader from '@/components/main-header';

import BookEditor from './components/book-editor';

export const dynamic = 'force-dynamic';

export interface BookProps {
    params: { id: string };
}

export default async function Book({ params: { id } }: BookProps) {
    const supabase = createServerComponentClient({ cookies });
    const { data: book } = await supabase
        .from('books')
        .select('*, tracks(*)')
        .eq('id', id)
        .single();

    const tracks = book.tracks.sort((a: Track, b: Track) => a.index! - b.index!);

    return (
        <MainContainer
            background={book.cover}
            classNames={{
                container: 'w-[48rem]',
            }}
        >
            <MainHeader />
            <BookEditor book={book} tracks={tracks} />
        </MainContainer>
    );
}

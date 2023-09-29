import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { type SupabaseBook } from '@/types/books';

import MainContainer from '@/components/main-container';
import JsonViewer from '@/components/json-viewer';

import MainPlayer from './components/main-player';
import TrackList from './components/track-list';

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

    const debug = searchParams?.debug !== undefined;

    return (
        <>
            {debug && <JsonViewer data={book} />}
            <MainContainer
                background={book.cover}
                classNames={{
                    container: 'min-h-screen justify-center items-center select-none',
                }}
            >
                <div className='flex flex-row'>
                    <MainPlayer book={book} />
                    <TrackList book={book} trackList={book.tracks} />
                </div>
            </MainContainer>
        </>
    );
}

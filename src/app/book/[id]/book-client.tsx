'use client';
import { useQueryState, parseAsBoolean } from 'next-usequerystate';
import { type Track, type Book } from '@/types/books';

import MainContainer from '@/components/main-container';
import JsonViewer from '@/components/json-viewer';

import MainPlayer from './components/main-player';
import TrackList from './components/track-list';

export interface BookProps {
    debug?: boolean;
    book: Book;
    tracks: Track[];
}

export default function BookClient({ debug, book, tracks }: BookProps) {
    const [showTracks, setShowTracks] = useQueryState('tracks', parseAsBoolean.withDefault(true));

    const handleToggleTracks = () => {
        setShowTracks(!showTracks);
    };

    return (
        <>
            {debug && <JsonViewer data={book} />}
            <MainContainer
                background={book.cover}
                classNames={{
                    container:
                        'min-h-screen justify-center items-center select-none transition-all',
                }}
            >
                <div className='flex flex-row'>
                    <MainPlayer
                        book={book}
                        trackList={tracks}
                        showTracks={showTracks}
                        onToggleTracks={handleToggleTracks}
                    />
                    <TrackList book={book} trackList={tracks} showTracks={showTracks} />
                </div>
            </MainContainer>
        </>
    );
}

'use client';
import { Card, CardBody } from '@nextui-org/card';

import { type Book as BookEntity, type Track as TrackEnitity } from '@/types/books';
import { cn } from '@/helpers/utils';
import { useTrackList } from '@/providers/track-list-provider';

import TrackItem from './track-item';

export interface TrackListProps {
    book: BookEntity;
    trackList: TrackEnitity[];
}

export default function TrackList({ book, trackList }: TrackListProps) {
    const { currentTrackNo, playing, playAt, pause } = useTrackList();
    return (
        <Card
            className={cn(
                'rounded-l-none w-[400px] flex-none border-none bg-background/70 dark:bg-default-100/60 transition-all',
                'animate-fade-right animate-once animate-duration-300 animate-ease-in-out animate-fill-both',
                'hidden md:flex',
            )}
            shadow='sm'
            isBlurred
        >
            <CardBody className='flex-col flex-nowrap'>
                {trackList.map((track: TrackEnitity, index: number) => (
                    <TrackItem
                        playing={playing && currentTrackNo === index}
                        key={track.id}
                        book={book}
                        track={track}
                        trackNo={index}
                        onPlay={playAt}
                        onPause={pause}
                    />
                ))}
            </CardBody>
        </Card>
    );
}

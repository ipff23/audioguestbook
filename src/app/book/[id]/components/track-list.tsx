'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody } from '@nextui-org/card';

import { type Book as BookEntity, type Track as TrackEnitity } from '@/types/books';
import { cn } from '@/helpers/utils';
import { useTrackList } from '@/providers/track-list-provider';

import TrackItem from './track-item';

export interface TrackListProps {
    book: BookEntity;
    trackList: TrackEnitity[];
    showTracks?: boolean;
}

export default function TrackList({ book, trackList, showTracks }: TrackListProps) {
    const { currentTrackNo, playing, playAt, pause } = useTrackList();
    return (
        <AnimatePresence>
            {showTracks && (
                <motion.div
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -400 }}
                    layout
                >
                    <Card
                        className={cn(
                            'rounded-l-none w-[400px] max-h-[760px] h-full flex-none border-none bg-background/70 dark:bg-default-100/60 transition-all relative z-0',
                            'animate-fade-right animate-once animate-duration-300 animate-ease-in-out animate-fill-both',
                            'hidden md:flex',
                            'overflow-x-scroll',
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
                </motion.div>
            )}
        </AnimatePresence>
    );
}

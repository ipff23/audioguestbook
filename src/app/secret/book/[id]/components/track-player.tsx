'use client';
import { useEffect } from 'react';

import { Button } from '@nextui-org/button';

import { useEmitter, useListener } from '@/providers/bus-provider';
import { useTrack } from '@/hooks/use-track';

import TrashIcon from '@/icons/trash-regular';

import TrackSlider from './track-slider';
import PlayPauseIcon from './play-pause-icon';

export interface TrackPlayerProps {
    id: string;
    name: string;
    source: string;
    onRemove?: (id: string) => void;
}

export default function TrackPlayer({ id, name, source, onRemove }: TrackPlayerProps) {
    const { buffering, playing, currentTime, duration, play, pause, load } = useTrack();

    const emitPlay = useEmitter('play', id);

    useListener('play', (playId: string) => {
        if (playId !== id) {
            pause();
        }
    });

    useEffect(() => {
        load(source);
    }, []);

    const playPause = () => {
        if (playing) {
            pause();
        } else {
            play();
            emitPlay();
        }
    };

    const handleRemove = () => {
        pause();
        onRemove?.(id);
    };

    return (
        <div className='w-full flex flex-row items-center gap-3 p-2 bg-slate-100/70 dark:bg-slate-500/50 rounded-lg'>
            <Button
                color='primary'
                className='rounded-full'
                onClick={playPause}
                isDisabled={buffering}
                isIconOnly
            >
                <PlayPauseIcon buffering={buffering} playing={playing} />
            </Button>

            <TrackSlider name={name} currentTime={currentTime} duration={duration} />

            <Button variant='flat' color='danger' onClick={handleRemove} isIconOnly>
                <TrashIcon />
            </Button>
        </div>
    );
}

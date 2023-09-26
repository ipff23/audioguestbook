'use client';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';

import TrashIcon from '@/icons/trash-regular';
import PauseFill from '@/icons/pause-fill';
import PlayFill from '@/icons/play-fill';
import { useEmitter, useListener } from '@/providers/bus-provider';
import { useTrack } from '@/hooks/use-track';
import { useEffect } from 'react';

const PlayPauseIcon = ({ buffering, playing }: { buffering: boolean; playing: boolean }) => {
    if (buffering) {
        return <Spinner size='sm' color='danger' />;
    }

    if (!playing) {
        return <PlayFill />;
    }

    return <PauseFill />;
};

const secondsToMin = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = `${Math.floor(seconds % 60)}`.padStart(2, '0');
    return `${mins}:${secs}`;
};

const TrackSlider = ({
    name,
    currentTime,
    duration,
}: {
    name: string;
    currentTime: number;
    duration: number;
}) => {
    const progress = (currentTime / duration) * 100;
    return (
        <div className='flex-1 bg-gray-300 dark:bg-gray-800 rounded-md px-2 py-1 relative overflow-hidden'>
            <div
                className='absolute top-0 left-0 h-full bg-sky-300 bg-sky-800 z-0'
                style={{ width: `${progress}%` }}
            ></div>
            <div className='flex flex-col justify-center relative z-1'>
                <span className='text-slate-800 dark:text-zinc-100 text-sm line-clamp-1'>{name}</span>

                <span className='flex flex-row items-center gap-1 text-xs'>
                    <span className='text-slate-600 dark:text-zinc-200'>
                        {secondsToMin(currentTime)}
                    </span>
                    <span className='text-slate-500 dark:text-zinc-300'>
                        {secondsToMin(duration)}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default function TrackPlayer({
    id,
    name,
    source,
    onRemove,
}: {
    id: string;
    name: string;
    source: string;
    onRemove?: (id: string) => void;
}) {
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

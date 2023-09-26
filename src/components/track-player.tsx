'use client';

import { Button } from '@nextui-org/button';
import { Progress } from '@nextui-org/progress';
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

export default function TrackPlayer({
    id,
    source,
    onRemove,
}: {
    id: string;
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
            <Progress
                size='sm'
                className='flex-1'
                value={currentTime}
                minValue={0}
                maxValue={duration}
            />

            <span className='flex flex-row items-center gap-1 text-sm'>
                <span className='text-zinc-200'>{secondsToMin(currentTime)}</span>
                <span className='text-zinc-400'>{secondsToMin(duration)}</span>
            </span>
            <Button variant='flat' color='danger' onClick={handleRemove} isIconOnly>
                <TrashIcon />
            </Button>
        </div>
    );
}

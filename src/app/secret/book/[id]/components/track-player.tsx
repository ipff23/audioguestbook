'use client';
import { useEffect } from 'react';
import { useEmitter, useListener } from '@/providers/bus-provider';
import { useTrack } from '@/hooks/use-track';

import PlayPauseButton from './play-pause-button';
import TrackBar from './track-bar';
import TrackTimer from './track-timer';

export interface TrackPlayerProps {
    id: string;
    source?: string;
    onDurationChange?: (duration: number) => void;
}

export default function TrackPlayer({ id, source, onDurationChange }: TrackPlayerProps) {
    const emitPlay = useEmitter('book-editor:play', id);

    const { buffering, playing, currentTime, duration, play, pause, load, seek } = useTrack({
        onPlay: () => emitPlay(),
    });

    useListener('book-editor:play', (playId: string) => {
        if (playId !== id) {
            pause();
        }
    });

    useEffect(() => {
        pause();
        seek(0);

        if (source) {
            load(source);
        }
    }, [source]);

    const handlePlay = () => {
        play();
        emitPlay();
    };

    const handleSeek = ({ value }: { progress: number; value: number }) => {
        seek(value, true);
    };

    useEffect(() => {
        onDurationChange?.(Math.floor(duration));
    }, [duration]);

    return (
        <div className='flex flex-1 flex-row items-center gap-3 p-2 pr-4 bg-slate-100/70 dark:bg-slate-500/50 rounded-lg'>
            <PlayPauseButton
                playing={playing}
                buffering={!source || buffering}
                onPlay={handlePlay}
                onPause={pause}
            />
            <TrackBar currentTime={currentTime} duration={duration} onChange={handleSeek} />
            <TrackTimer currentTime={currentTime} duration={duration} />
        </div>
    );
}

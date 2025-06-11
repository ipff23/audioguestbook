import { useEffect } from 'react';
import { cn } from '@/modules/core/helpers/utils';
import { useEmitter, useListener } from '@/modules/core/providers/bus-provider';
import { useTrack } from '@/modules/main/hooks/use-track';

import { PlayPauseButton } from './play-pause-button';
import { TrackBar } from './track-bar';
import { TrackTimer } from './track-timer';

export const TrackPlayer = ({ className, id, source, onDurationChange }) => {
    const emitPlay = useEmitter('book-editor:play', id);

    const { buffering, playing, currentTime, duration, play, pause, load, seek } = useTrack({
        onPlay: () => emitPlay(),
    });

    useListener('book-editor:play', playId => {
        if (playId !== id) pause();
    });

    useEffect(() => {
        pause();
        seek(0);

        if (source) load(source);
    }, [source]);

    const handlePlay = () => {
        play();
        emitPlay();
    };

    const handleSeek = ({ value }) => {
        seek(value, true);
    };

    useEffect(() => {
        onDurationChange?.(Math.floor(duration));
    }, [duration]);

    return (
        <div
            className={cn(
                'h-12 p-2 pr-4 w-full bg-white dark:bg-gray-700 rounded-md',
                'flex items-center gap-3',
                className,
            )}
        >
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
};

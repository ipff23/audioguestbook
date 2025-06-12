import { useRef } from 'react';
import { cn } from '@/modules/core/helpers/utils';
import { useTrackbar } from '@/modules/core/hooks/use-trackbar';
import { PlayPauseButton } from './play-pause-button';

export const MiniPlayer = ({
    className,
    book,
    tracks = [],
    playing,
    buffering,
    currentTrackNo = 0,
    duration = 100,
    currentTime = 50,
    onTimeChange,
    onPlay,
    onPause,
}) => {
    const $track = useRef(null);

    const { progress, clickToChange, setMouseDown } = useTrackbar({
        trackRef: $track,
        minValue: 0,
        maxValue: duration,
        value: currentTime,
        onChange: onTimeChange,
    });

    const currentTrack = tracks[currentTrackNo] || {};

    return (
        <div className='relative'>
            <PlayPauseButton
                className="absolute top-2 right-6 z-20 size-12 rounded-2xl [&_svg:not([class*='size-'])]:size-6"
                playing={playing}
                buffering={buffering}
                onPlay={onPlay}
                onPause={onPause}
            />

            <div
                ref={$track}
                className={cn(
                    'relative bg-gray-100 dark:bg-gray-600 rounded-2xl overflow-hidden',
                    className,
                )}
                onClick={clickToChange}
                onMouseDown={setMouseDown}
                style={{
                    '--track-progress': `${progress}%`,
                    '--track-remain': `${100 - progress}%`,
                }}
            >
                <div className='absolute w-full h-full -translate-x-(--track-remain) bg-gray-200 dark:bg-gray-700 z-0' />
                <div className='absolute left-(--track-progress) -translate-x-2 w-4 h-full' />

                <div className='relative z-1 p-2 flex items-center gap-4'>
                    <img src={book.cover} className='size-12 object-cover rounded-lg' />
                    <div>
                        <h1 className='text-sm font-medium break-all line-clamp-1 text-ellipsis'>
                            {currentTrack?.name}
                        </h1>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                            Track {currentTrackNo} / {tracks.length}
                        </p>
                    </div>
                    <div className='size-12' />
                </div>
            </div>
        </div>
    );
};

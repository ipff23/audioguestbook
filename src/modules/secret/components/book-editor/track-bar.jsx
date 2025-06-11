import { useRef } from 'react';
import { cn } from '@/modules/core/helpers/utils';
import { useTrackbar } from '@/modules/core/hooks/use-trackbar';

export const TrackBar = ({ className, classNames, duration = 0, currentTime = 0, onChange }) => {
    const $track = useRef(null);

    const { progress, mouseDown, clickToChange, setMouseDown } = useTrackbar({
        trackRef: $track,
        minValue: 0,
        maxValue: duration,
        value: currentTime,
        onChange,
    });

    return (
        <div
            ref={$track}
            className={cn('group w-full relative h-4 flex items-center cursor-pointer', className)}
            onClick={clickToChange}
            onMouseDown={setMouseDown}
            style={{
                '--track-progress': `${progress}%`,
                '--track-remain': `${100 - progress}%`,
            }}
        >
            <button
                className={cn(
                    'absolute left-(--track-progress) h-1 w-1 -ml-0.5 group-hover:size-4 group-hover:-ml-2 transition-[height,width,margin] !duration-100 rounded-full bg-neutral-800 dark:bg-white ',
                    { 'h-4 w-4 -ml-2': mouseDown },
                    classNames?.thumb,
                )}
            />

            <div
                className={cn(
                    'w-full z-0 relative overflow-hidden h-1 rounded-full bg-neutral-500/30',
                    classNames?.track,
                )}
            >
                <div
                    className={cn(
                        'h-full w-full rounded-full -translate-x-(--track-remain) transition-transform !duration-0 bg-neutral-800 dark:bg-white',
                        classNames?.indicator,
                    )}
                />
            </div>
        </div>
    );
};

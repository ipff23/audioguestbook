import { cn } from '@/modules/core/helpers/utils';
import { useTrackbar } from '@/modules/core/hooks/use-trackbar';
import { useRef } from 'react';

export const Trackbar = ({
    minValue = 0,
    maxValue = 100,
    value = 50,
    className,
    classNames,
    onChange,
}) => {
    const $track = useRef(null);

    const { progress, mouseDown, clickToChange, setMouseDown } = useTrackbar({
        trackRef: $track,
        minValue,
        maxValue,
        value,
        onChange,
    });

    return (
        <div
            ref={$track}
            className={cn(
                'group/trackbar relative h-4 flex items-center cursor-pointer',
                className,
            )}
            onClick={clickToChange}
            onMouseDown={setMouseDown}
            style={{
                '--track-progress': `${progress}%`,
                '--track-remain': `${100 - progress}%`,
            }}
        >
            <button
                className={cn(
                    'absolute left-(--track-progress) h-1 w-1 -ml-0.5 group-hover/trackbar:size-4 group-hover/trackbar:-ml-2 transition-[height,width,margin] !duration-100 rounded-full bg-gray-800 dark:bg-white ',
                    { 'size-4 -ml-2': mouseDown },
                    classNames?.thumb,
                )}
            />

            <div
                className={cn(
                    'flex-1 z-0 relative overflow-hidden h-1 rounded-full bg-gray-500/30',
                    classNames?.track,
                )}
            >
                <div
                    className={cn(
                        'h-full rounded-full -translate-x-(--track-remain) transition-transform !duration-0 bg-gray-800 dark:bg-white',
                        classNames?.indicator,
                    )}
                />
            </div>
        </div>
    );
};

'use client';
import { useRef } from 'react';
import { cn } from '@/helpers/utils';
import useTrackBar, { type TrackBarArgs } from '@/hooks/use-track-bar';

interface TrackBarClassNames {
    track?: string;
    indicator?: string;
    thumb?: string;
}

export interface TrackBarProps extends TrackBarArgs {
    classNames?: TrackBarClassNames;
}

export default function TrackBar({
    minValue = 0,
    maxValue = 100,
    value = 50,
    classNames,
    onChange,
}: TrackBarProps) {
    const $track = useRef<HTMLDivElement>(null);
    const { progress, mouseDown, clickToChange, setMouseDown } = useTrackBar({
        trackRef: $track,
        minValue,
        maxValue,
        value,
        onChange,
    });

    return (
        <div
            ref={$track}
            className='group relative h-4 flex items-center cursor-pointer'
            onClick={clickToChange}
            onMouseDown={setMouseDown}
        >
            <button
                className={cn(
                    'absolute h-1 w-1 -ml-0.5 group-hover:h-4 group-hover:w-4 group-hover:-ml-2 transition-[height,width,margin] !duration-100 rounded-full bg-default-800 dark:bg-white ',
                    { 'h-4 w-4 -ml-2': mouseDown },
                    classNames?.thumb,
                )}
                style={{
                    left: `${progress}%`,
                }}
            />

            <div
                className={cn(
                    'flex-1 z-0 relative overflow-hidden h-1 rounded-full bg-default-500/30',
                    classNames?.track,
                )}
            >
                <div
                    className={cn(
                        'h-full rounded-full transition-transform !duration-0 bg-default-800 dark:bg-white hove',
                        classNames?.indicator,
                    )}
                    style={{
                        transform: `translateX(-${100 - progress}%)`,
                    }}
                />
            </div>
        </div>
    );
}

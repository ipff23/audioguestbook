import { secondsToMin } from '@/helpers/strings';
import useTrackBar from '@/hooks/use-track-bar';
import { useRef } from 'react';

export interface TrackSliderProps {
    name: string;
    currentTime: number;
    duration: number;
    onChange?: ({ progress, value }: { progress: number; value: number }) => void;
}

export default function TrackSlider({ name, currentTime, duration, onChange }: TrackSliderProps) {
    // const progress = (currentTime / duration) * 100;
    const $track = useRef<HTMLDivElement>(null);

    const { progress, clickToChange, setMouseDown } = useTrackBar({
        trackRef: $track,
        minValue: 0,
        maxValue: duration,
        value: currentTime,
        onChange,
    });

    return (
        <div
            className='select-none flex-1 bg-gray-300 dark:bg-gray-800 rounded-md px-2 py-1 relative overflow-hidden'
            ref={$track}
            onClick={clickToChange}
            onMouseDown={setMouseDown}
        >
            <div
                className='absolute top-0 left-0 h-full bg-sky-300 dark:bg-sky-800 z-0'
                style={{ width: `${progress}%` }}
            />
            <div className='flex flex-col justify-center relative z-1'>
                <span className='text-slate-800 dark:text-zinc-100 text-sm line-clamp-1'>
                    {name}
                </span>

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
}

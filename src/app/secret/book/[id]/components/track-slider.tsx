import { secondsToMin } from '@/helpers/strings';

export interface TrackSliderProps {
    name: string;
    currentTime: number;
    duration: number;
}

export default function TrackSlider({ name, currentTime, duration }: TrackSliderProps) {
    const progress = (currentTime / duration) * 100;
    return (
        <div className='flex-1 bg-gray-300 dark:bg-gray-800 rounded-md px-2 py-1 relative overflow-hidden'>
            <div
                className='absolute top-0 left-0 h-full bg-sky-300 dark:bg-sky-800 z-0'
                style={{ width: `${progress}%` }}
            ></div>
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

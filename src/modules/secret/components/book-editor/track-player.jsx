import { cn } from '@/modules/core/helpers/utils';
import { PlayPauseButton } from './play-pause-button';
import { TrackBar } from './track-bar';
import { TrackTimer } from './track-timer';

export const TrackPlayer = ({ className }) => {
    return (
        <div
            className={cn(
                'h-12 p-2 pr-4 w-full bg-white dark:bg-gray-700 rounded-md',
                'flex items-center gap-3',
                className,
            )}
        >
            <PlayPauseButton />
            <TrackBar duration={100} currentTime={50} />
            <TrackTimer currentTime={35} duration={120} />
        </div>
    );
};

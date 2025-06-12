import { Loader2 } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';

import { Button } from '@/modules/shadcn/ui/button';
import { Pause, Play } from '@/modules/core/components/icons';

export const PlayPauseButton = ({ className, playing, buffering, onPlay, onPause }) => {
    const handleClick = () => {
        if (playing) {
            onPause?.();
        } else {
            onPlay?.();
        }
    };

    const playPuaseIcon = playing ? <Pause /> : <Play />;

    const renderIcon = !buffering ? playPuaseIcon : <Loader2 className='animate-spin' />;

    return (
        <Button
            className={cn(
                'rounded-full size-8 bg-gray-200 text-black dark:bg-gray-800 dark:text-white',
                'hover:bg-gray-300 dark:hover:bg-gray-600',
                className,
            )}
            onClick={handleClick}
            disabled={buffering}
        >
            {renderIcon}
        </Button>
    );
};

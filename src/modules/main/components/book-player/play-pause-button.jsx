import { Pause, Play } from '@/modules/core/components/icons';
import { cn } from '@/modules/core/helpers/utils';
import { Button } from '@/modules/shadcn/ui/button';
import { Loader2 } from 'lucide-react';

export const PlayPauseButton = ({ className, playing, buffering, onPlay, onPause }) => {
    const handleClick = e => {
        e.stopPropagation();
        e.preventDefault();

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
                "size-16 bg-transparent hover:bg-foreground/10 text-foreground rounded-full [&_svg:not([class*='size-'])]:size-8",
                className,
            )}
            size='icon'
            disabled={buffering}
            onClick={handleClick}
        >
            {renderIcon}
        </Button>
    );
};

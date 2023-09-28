import { Button } from '@nextui-org/button';
import PauseIcon from '@/icons/pause-fill';
import PlayIcon from '@/icons/play-fill';

export interface PlayPauseButtonProps {
    playing?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
}

export default function PlayPauseButton({ playing, onPlay, onPause }: PlayPauseButtonProps) {
    const handleClick = () => {
        if (playing) {
            onPause?.();
        } else {
            onPlay?.();
        }
    };

    return (
        <Button
            isIconOnly
            className='w-[80px] h-[80px] data-[hover]:bg-foreground/10'
            radius='full'
            variant='light'
            onClick={handleClick}
        >
            {playing ? <PauseIcon className='text-4xl' /> : <PlayIcon className='text-4xl' />}
        </Button>
    );
}

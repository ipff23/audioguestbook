import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';

import PauseIcon from '@/icons/pause-fill';
import PlayIcon from '@/icons/play-fill';

export interface PlayPauseButtonProps {
    playing?: boolean;
    buffering?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
}

export default function PlayPauseButton({
    playing,
    buffering,
    onPlay,
    onPause,
}: PlayPauseButtonProps) {
    const handleClick = () => {
        if (playing) {
            onPause?.();
        } else {
            onPlay?.();
        }
    };

    const playPuaseIcon = playing ? (
        <PauseIcon className='text-4xl' />
    ) : (
        <PlayIcon className='text-4xl' />
    );

    const renderIcon = !buffering ? (
        playPuaseIcon
    ) : (
        <Spinner
            size='lg'
            classNames={{
                circle1: 'border-4 border-b-black dark:border-b-white',
                circle2: 'border-4 border-b-black dark:border-4 border-b-white',
            }}
        />
    );

    return (
        <Button
            className='w-[80px] h-[80px] data-[hover]:bg-foreground/10 !opacity-100'
            radius='full'
            variant='light'
            onClick={handleClick}
            isDisabled={buffering}
            isIconOnly
        >
            {renderIcon}
        </Button>
    );
}

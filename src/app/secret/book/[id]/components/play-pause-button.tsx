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

    const playPuaseIcon = playing ? <PauseIcon /> : <PlayIcon />;

    const renderIcon = !buffering ? (
        playPuaseIcon
    ) : (
        <Spinner
            size='sm'
            classNames={{
                circle1: 'border-2 border-b-black dark:border-b-white',
                circle2: 'border-2 border-b-black border-b-white',
            }}
        />
    );

    return (
        <Button size='sm' radius='full' onClick={handleClick} isDisabled={buffering} isIconOnly>
            {renderIcon}
        </Button>
    );
}

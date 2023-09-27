import { Spinner } from '@nextui-org/spinner';

import PauseFill from '@/icons/pause-fill';
import PlayFill from '@/icons/play-fill';

export interface PlayPauseIconProps {
    buffering: boolean;
    playing: boolean;
}

export default function PlayPauseIcon({ buffering, playing }: PlayPauseIconProps) {
    if (buffering) {
        return <Spinner size='sm' color='danger' />;
    }

    if (!playing) {
        return <PlayFill />;
    }

    return <PauseFill />;
}

import { secondsToMin } from '@/helpers/strings';

export interface TimerProps {
    currentTime?: number;
    duration?: number;
}

export default function TrackTimer({ currentTime = 0, duration = 0 }: TimerProps) {
    return (
        <div className='flex items-center gap-1'>
            <p className='text-small'>{secondsToMin(currentTime)}</p>
            <p className='text-small text-foreground/50'>{secondsToMin(duration)}</p>
        </div>
    );
}

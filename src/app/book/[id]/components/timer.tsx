import { secondsToMin } from '@/helpers/strings';

export interface TimerProps {
    currentTime?: number;
    duration?: number;
}

export default function Timer({ currentTime = 0, duration = 0 }: TimerProps) {
    return (
        <div className='flex justify-between'>
            <p className='text-small'>{secondsToMin(currentTime)}</p>
            <p className='text-small text-foreground/50'>{secondsToMin(duration)}</p>
        </div>
    );
}

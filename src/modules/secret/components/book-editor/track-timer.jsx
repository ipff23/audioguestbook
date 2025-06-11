import { humanMinutes } from '@/modules/core/helpers/strings';

export const TrackTimer = ({ currentTime = 0, duration = 0 }) => {
    return (
        <div className='flex items-center gap-1 text-sm'>
            <p className='text-small'>{humanMinutes(currentTime)}</p>
            <p className='text-small text-foreground/50'>{humanMinutes(duration)}</p>
        </div>
    );
};

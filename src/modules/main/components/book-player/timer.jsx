import { humanMinutes } from '@/modules/core/helpers/strings';

export const Timer = ({ currentTime = 0, duration = 0, currentTrackNo = 0, totalTracks = 0 }) => {
    return (
        <div className='flex justify-between'>
            <p className='text-small'>{humanMinutes(currentTime)}</p>
            <p className='text-small text-foreground/50'>
                Track {`${currentTrackNo} / ${totalTracks}`}
            </p>
            <p className='text-small text-foreground/50'>{humanMinutes(duration)}</p>
        </div>
    );
};

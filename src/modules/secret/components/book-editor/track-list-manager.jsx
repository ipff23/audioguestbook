import { cn } from '@/modules/core/helpers/utils';
import { SrotableManager } from './sortable-manager';

export const TrackListManager = ({ className }) => {
    return (
        <div className={cn('w-full flex flex-col gap-4', className)}>
            <SrotableManager />
        </div>
    );
};

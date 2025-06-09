import { Square } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { Toggle } from '@/modules/shadcn/ui/toggle';

export const ToggleIcon = ({ className, icons, ...props }) => {
    const onIcon = icons?.on || <Square fill='currentColor' />;
    const offIcon = icons?.off || <Square />;

    return (
        <Toggle className={cn('group', className)} {...props}>
            <div className='shrink-0 scale-0 opacity-0 transition-all group-aria-pressed:scale-100 group-aria-pressed:opacity-100'>
                {onIcon}
            </div>
            <div className='absolute shrink-0 scale-100 opacity-100 transition-all group-aria-pressed:scale-0 group-aria-pressed:opacity-0'>
                {offIcon}
            </div>
        </Toggle>
    );
};

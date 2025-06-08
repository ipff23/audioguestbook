import { useState } from 'react';

import { useSettings } from '@/modules/core/hooks/use-settings';
import { useResize } from '@/modules/core/hooks/use-resize';
import { useBreakpoint } from '@/modules/core/hooks/use-breakpoint';

import { cn } from '@/modules/core/helpers/utils';

export const BreakpointIndicator = ({ position = undefined }) => {
    const [size, setSize] = useState('');
    const [showIndicator] = useSettings('settings:breakpoint_indicator:show', false);

    const positions = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
        'middle-left': 'left-4 top-1/2 transform -translate-y-1/2',
        'middle-right': 'right-4 top-1/2 transform -translate-y-1/2',
    };

    const positionClassName = position ? positions?.[position] : positions['bottom-right'];

    useResize(() => {
        setSize(window.innerWidth);
    });

    const breakpoint = useBreakpoint('xs');

    if (!showIndicator) return null;

    return (
        <div
            className={cn(
                'fixed z-500 flex gap-1 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold',
                positionClassName,
            )}
        >
            <span className='uppercase'>{breakpoint}</span>
            <span>{`•`}</span>
            <span>{`${size}px`}</span>
        </div>
    );
};

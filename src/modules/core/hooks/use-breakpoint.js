import { useState } from 'react';
import { sortBy } from '@/modules/core/helpers/arrays';
import { useResize } from '@/modules/core/hooks/use-resize';

const DEFAULT = 'default';
const DEFAULT_BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

export const useBreakpoint = (defaultBreakpoint = DEFAULT, breakpoints = DEFAULT_BREAKPOINTS) => {
    const [breakpoint, setBreakpoint] = useState(defaultBreakpoint);

    useResize(() => {
        const [result] = sortBy(Object.entries(breakpoints), '1', 'desc').find(([, value]) => {
            return window.innerWidth >= value;
        }) || [defaultBreakpoint];

        setBreakpoint(result);
    });

    return breakpoint;
};

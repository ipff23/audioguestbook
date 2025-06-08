import { useEffect } from 'react';

export const useDelayedEffect = (effect, deps = [], delay = 300) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            effect();
        }, delay);

        return () => clearTimeout(handler);
    }, [effect, delay, ...deps]);
};

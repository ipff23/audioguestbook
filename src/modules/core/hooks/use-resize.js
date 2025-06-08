import { useEffect } from 'react';

export const useResize = onResize => {
    useEffect(() => {
        const handleResize = event => {
            onResize?.(event);
        };

        onResize?.();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [onResize]);
};

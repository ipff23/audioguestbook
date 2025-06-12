import { useEffect } from 'react';

export const useEventListener = (target, eventName, eventHandler, options = {}, deps = []) => {
    useEffect(() => {
        if (!target?.addEventListener) return;
        target.addEventListener(eventName, eventHandler, options);

        return () => {
            target.removeEventListener(eventName, eventHandler);
        };
    }, [target, eventName, options, eventHandler, ...deps]);
};

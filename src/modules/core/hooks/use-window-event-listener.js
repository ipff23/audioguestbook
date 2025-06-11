import { useEffect } from 'react';

export const useWindowEventListener = (eventName, eventHandler, options) => {
    useEffect(() => {
        window.addEventListener(eventName, eventHandler, options);
        return () => window.removeEventListener(eventName, eventHandler);
    }, [eventName, eventHandler, options]);
};

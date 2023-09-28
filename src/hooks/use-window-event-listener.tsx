import { useEffect } from 'react';

export function useWindowEventListener(
    eventName: string,
    eventHandler: (...args: any[]) => void,
    options?: boolean | AddEventListenerOptions,
) {
    useEffect(() => {
        if (!window) return;
        window.addEventListener(eventName, eventHandler, options);

        return () => {
            window.removeEventListener(eventName, eventHandler);
        };
    }, [eventName, options]);
}

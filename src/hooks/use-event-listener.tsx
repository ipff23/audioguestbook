import { useEffect } from 'react';

export function useEventListener<T extends Element>(
    target: T,
    eventName: string,
    eventHandler: (...args: any[]) => void,
    options?: boolean | AddEventListenerOptions,
    deps: any[] = [],
) {
    useEffect(() => {
        if (!target?.addEventListener) return;
        target.addEventListener(eventName, eventHandler, options);

        return () => {
            target.removeEventListener(eventName, eventHandler);
        };
    }, [target, eventName, options, eventHandler, ...deps]);
}

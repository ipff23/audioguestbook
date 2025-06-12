import { useState, useCallback } from 'react';

export const useMap = (initial = []) => {
    const [map, setMap] = useState(() => new Map(initial));

    const set = useCallback((key, value) => {
        setMap(prev => {
            const next = new Map(prev);
            next.set(key, value);
            return next;
        });
    }, []);

    const remove = useCallback(key => {
        setMap(prev => {
            const next = new Map(prev);
            next.delete(key);
            return next;
        });
    }, []);

    const reset = useCallback(() => {
        setMap(new Map(initial));
    }, [initial]);

    const get = useCallback(
        key => {
            return map.get(key);
        },
        [map],
    );

    const has = useCallback(
        key => {
            return map.has(key);
        },
        [map],
    );

    return [[...map.entries()], { set, remove, reset, get, has }];
};

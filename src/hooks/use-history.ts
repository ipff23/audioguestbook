import { useState } from 'react';

export type HistoryArgs<T> = [
    T[],
    {
        pop: () => T;
        push: (item: T) => void;
        clear: () => void;
        size: () => number;
    },
];

export const useHistory = <T>(): HistoryArgs<T> => {
    const [history, setHistory] = useState<T[]>([]);

    const pop = (): T => {
        const lastIndex = history.length - 1;
        const lastItem = history[lastIndex];
        const newHistory = [...history].splice(0, lastIndex);
        setHistory(newHistory);
        return lastItem;
    };

    const push = (item: T) => {
        const newHistory = [...history];
        newHistory.push(item);
        setHistory(newHistory);
    };

    const clear = () => {
        setHistory([]);
    };

    const size = () => {
        return history.length;
    };

    return [history, { pop, push, clear, size }];
};

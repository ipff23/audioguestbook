import { useState } from 'react';

export const useHistory = () => {
    const [history, setHistory] = useState([]);

    const pop = () => {
        const lastIndex = history.length - 1;
        const lastItem = history[lastIndex];
        const newHistory = [...history].splice(0, lastIndex);
        setHistory(newHistory);
        return lastItem;
    };

    const push = item => {
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

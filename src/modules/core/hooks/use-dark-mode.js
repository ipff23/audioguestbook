import { useEffect } from 'react';
import { useLocalStorage } from '@/modules/core/hooks/use-local-storage';

export const useDarkMode = () => {
    const getSystemTheme = () =>
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const [theme, setTheme] = useLocalStorage('theme', null);

    useEffect(() => {
        if (theme === null) setTheme(getSystemTheme());
    }, [theme, setTheme]);

    const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

    return [theme, toggle];
};

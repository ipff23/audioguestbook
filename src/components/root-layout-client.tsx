'use client';
import useDarkMode from 'use-dark-mode';
import { type ChildrenContainer } from '@/types/common';

import { Providers } from '../app/providers';

export default function RootLayout({ children }: ChildrenContainer) {
    const darkMode = useDarkMode(true);
    const themeClass = darkMode.value ? 'dark' : 'light';

    return (
        <html lang='en' className={`${themeClass}`}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

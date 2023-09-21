import './globals.css';

import RootLayoutClient from '@/components/root-layout-client';

import type { Metadata } from 'next';
import type { ChildrenContainer } from '@/types/common';
import ThemeSwitcher from '@/components/theme-switcher';

export const metadata: Metadata = {
    title: 'Audio Guestbook',
};

export default function RootLayout({ children }: ChildrenContainer) {
    return (
        <RootLayoutClient>
            {children}
            <ThemeSwitcher />
        </RootLayoutClient>
    );
}

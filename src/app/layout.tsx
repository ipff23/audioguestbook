import './globals.css';

import RootLayoutClient from '@/components/root-layout-client';

import type { Metadata } from 'next';
import type { ChildrenContainer } from '@/types/common';
import ThemeSwitcher from '@/components/theme-switcher';

export const metadata: Metadata = {
    title: 'Audio Guestbook',
    other: {
        'commit-hash': process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown',
        'commit-hash-public': process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? 'unknown',
    },
};

export default function RootLayout({ children }: ChildrenContainer) {
    return (
        <RootLayoutClient>
            {children}
            <ThemeSwitcher />
        </RootLayoutClient>
    );
}

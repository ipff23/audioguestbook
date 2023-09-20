import './globals.css';

import RootLayoutClient from './layout-client';

import type { Metadata } from 'next';
import type { ChildrenContainer } from '@/types/common';

export const metadata: Metadata = {
    title: 'Audio Guestbook',
};

export default function RootLayout({ children }: ChildrenContainer) {
    return <RootLayoutClient>{children}</RootLayoutClient>;
}

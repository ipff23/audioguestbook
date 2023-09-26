import './globals.css';

import { type Metadata } from 'next';
import { type ChildrenContainer } from '@/types/common';
import { getEnvironmentInfo } from '@/helpers/environment';

import RootLayoutClient from '@/components/root-layout';
import Footer from '@/components/footer';
import ThemeSwitcher from '@/components/theme-switcher';

const environmentInfo = getEnvironmentInfo();

export const metadata: Metadata = {
    title: 'Audio Guestbook',
    other: {
        ...environmentInfo,
    },
};

export default function RootLayout({ children }: ChildrenContainer) {
    return (
        <RootLayoutClient>
            {children}
            <ThemeSwitcher />
            <Footer semver={environmentInfo.semver} short={environmentInfo['commit-short']} />
        </RootLayoutClient>
    );
}

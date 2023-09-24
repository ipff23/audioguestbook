import './globals.css';

import { execSync } from 'child_process';
import packageJson from '../../package.json';
import RootLayoutClient from '@/components/root-layout-client';

import type { Metadata } from 'next';
import type { ChildrenContainer } from '@/types/common';
import ThemeSwitcher from '@/components/theme-switcher';

const getCommitHash = (): { full: string; short: string } => {
    //     const vercelCommitHash = process.env.VERCEL_GIT_COMMIT_SHA;
    //
    //     if (vercelCommitHash !== null && vercelCommitHash !== undefined) {
    //         return {
    //             full: vercelCommitHash,
    //             short: vercelCommitHash.substring(0, 7),
    //         };
    //     }

    const localCommitHash = execSync('git rev-parse HEAD').toString().trim();

    return {
        full: localCommitHash,
        short: localCommitHash.substring(0, 7),
    };
};

const commitHash = getCommitHash();

export const metadata: Metadata = {
    title: 'Audio Guestbook',
    other: {
        semver: packageJson.version,
        commit: commitHash.full,
        'commit-short': commitHash.short,
    },
};

export default function RootLayout({ children }: ChildrenContainer) {
    return (
        <RootLayoutClient>
            {children}
            <ThemeSwitcher />
            <footer className='fixed bottom-4 left-4 right-4 flex flex-row gap-2 justify-center text-sm'>
                <span className='opacity-75'>v{packageJson.version}</span>
                <span className='opacity-50'>#{commitHash.short}</span>
            </footer>
        </RootLayoutClient>
    );
}

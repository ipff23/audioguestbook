import { Barlow } from 'next/font/google';

import { cn } from '@/helpers/utils';

import ThemeSwitcher from '@/components/theme-switcher';

const barlow = Barlow({
    subsets: ['latin'],
    display: 'swap',
    weight: '900',
    style: 'italic',
});

export default async function Home() {
    return (
        <main className='bg-cover bg-center bg-[url("/img/background.jpg")] flex flex-col min-h-screen'>
            <div className='backdrop-blur-lg bg-slate-950/50 flex min-h-screen flex-col items-center justify-center'>
                <h1
                    className={cn(
                        barlow.className,
                        'text-8xl uppercase antialiased tracking-tight dark:text-slate-50 text-white',
                    )}
                >
                    Guestbook
                </h1>
                <ThemeSwitcher />
            </div>
        </main>
    );
}

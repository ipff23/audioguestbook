import { Barlow } from 'next/font/google';
import { cn } from '@/helpers/utils';

const barlow = Barlow({
    subsets: ['latin'],
    display: 'swap',
    weight: '900',
    style: 'italic',
});

export default function Logo({ className }: { className?: string }) {
    return (
        <h1
            className={cn(
                barlow.className,
                'text-3xl uppercase antialiased tracking-tight text-white dark:text-white',
                className,
            )}
        >
            Guestbook
        </h1>
    );
}

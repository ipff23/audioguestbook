import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';

import { Barlow } from 'next/font/google';

import { cn } from '@/helpers/utils';
import LogoutButton from '@/components/logout-button';
import SquaresFourFill from '@/icons/squeares-four-fill';

const barlow = Barlow({
    subsets: ['latin'],
    display: 'swap',
    weight: '900',
    style: 'italic',
});

export default async function Secret() {
    return (
        <main className='text-foreground bg-background bg-cover bg-center bg-[url("/img/background.jpg")] flex flex-col min-h-screen'>
            <div className='backdrop-blur-lg bg-slate-200/80 dark:bg-slate-950/90 flex min-h-screen flex-col items-center'>
                <div className='w-[42rem] p-6'>
                    <Card
                        isBlurred
                        className='border-none bg-background/60 dark:bg-default-100/50'
                        shadow='sm'
                    >
                        <CardBody className='felx flex-row gap-4'>
                            <h1
                                className={cn(
                                    barlow.className,
                                    'text-3xl uppercase antialiased tracking-tight',
                                )}
                            >
                                Guestbook
                            </h1>

                            <div className='flex-1' />

                            <Avatar
                                fallback={<SquaresFourFill className='text-default-500' />}
                                showFallback
                                isBordered
                            />
                            <LogoutButton />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </main>
    );
}

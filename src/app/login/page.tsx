import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';

import { Barlow } from 'next/font/google';

import { cn } from '@/helpers/utils';
import LoginButton from '@/components/login-button';
import SquaresFourFill from '@/icons/squeares-four-fill';

const barlow = Barlow({
    subsets: ['latin'],
    display: 'swap',
    weight: '900',
    style: 'italic',
});

export default async function Login() {
    return (
        <main className='text-foreground bg-background bg-cover bg-center bg-[url("/img/background.jpg")] flex flex-col min-h-screen'>
            <div className='backdrop-blur-lg bg-slate-950/50 flex min-h-screen flex-col items-center justify-center p-24 gap-24'>
                <Card
                    isBlurred
                    className='border-none bg-background/60 dark:bg-default-100/50 w-96'
                    shadow='sm'
                >
                    <CardHeader className='flex justify-center py-6'>
                        <h1
                            className={cn(
                                barlow.className,
                                'text-5xl uppercase antialiased tracking-tight',
                            )}
                        >
                            Guestbook
                        </h1>
                    </CardHeader>

                    <CardBody className='flex flex-col items-center gap-6 px-6 pb-8'>
                        <Avatar
                            className='w-20 h-20'
                            fallback={<SquaresFourFill className='w-12 h-12 text-default-500' />}
                            showFallback
                            isBordered
                        />

                        <p className='text-center'>
                            Inicia sesión con tu cuenta de{' '}
                            <span className='text-primary-500'>Google</span> para acceder al{' '}
                            <span className='text-secondary-500'>dashboard</span>.
                        </p>

                        <LoginButton />
                    </CardBody>
                </Card>
            </div>
        </main>
    );
}

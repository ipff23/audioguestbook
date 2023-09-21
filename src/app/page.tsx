import { Card } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

import { readSession } from '@/services/auth';

import ThemeSwitcher from '@/components/theme-switcher';
import AuthButton from '@/components/auth-button-server';

export default async function Home() {
    const user = await readSession();

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-24 gap-24'>
            {user !== null && (
                <Card isFooterBlurred radius='lg' className='border-none'>
                    <Image
                        alt={user?.displayName ?? 'Avatar'}
                        className='object-cover'
                        height={200}
                        width={200}
                        src={user?.photoURL ?? '#'}
                    />
                </Card>
            )}
            <AuthButton />
            <ThemeSwitcher />
        </main>
    );
}

import { Avatar } from '@nextui-org/avatar';
import { Card, CardHeader, CardBody } from '@nextui-org/card';

import PublicContainer from '@/components/public-container';
import Logo from '@/components/logo';
import LoginButton from '@/components/login-button';

import SquaresFourFill from '@/icons/squeares-four-fill';

export const dynamic = 'force-dynamic';

export default async function Login() {
    return (
        <PublicContainer>
            <Card
                isBlurred
                className='border-none bg-background/60 dark:bg-default-100/50 w-96'
                shadow='sm'
            >
                <CardHeader className='flex justify-center py-6'>
                    <Logo className='text-5xl text-black dark:text-white' />
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
        </PublicContainer>
    );
}

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';

import { getSessionUser } from '@/helpers/session';
import LogoutButton from '@/components/logout-button';
import SquaresFourFill from '@/icons/squeares-four-fill';
import Logo from '../components/logo';

export default async function MainHeader() {
    const supabase = createServerComponentClient({ cookies });
    const user = await getSessionUser(supabase);

    return (
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50' shadow='sm'>
            <CardBody className='felx flex-row gap-4'>
                <Link href='/secret'>
                    <Logo className='text-black dark:text-white' />
                </Link>

                <div className='flex-1' />

                <Avatar
                    src={user?.avatar ?? '#'}
                    fallback={<SquaresFourFill className='text-default-500' />}
                    showFallback
                    isBordered
                />
                <LogoutButton />
            </CardBody>
        </Card>
    );
}

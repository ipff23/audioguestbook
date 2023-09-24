'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';

import SignOutBoldIcon from '@/icons/sign-out-bold';

export default function LogoutButton() {
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <Button isIconOnly color='danger' variant='flat' onClick={handleLogout}>
            {loading ? <Spinner size='sm' color='danger' /> : <SignOutBoldIcon />}
        </Button>
    );
}

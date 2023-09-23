'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';

import SignOutBoldIcon from '@/icons/sign-out-bold';

const requestLogout = async (onFinished: () => void) => {
    try {
        await fetch('/api/logout');
    } catch (error) {
        console.error(error);
    } finally {
        onFinished();
    }
};

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleFinished = () => {
        setLoading(false);
        router.replace('/login');
    };

    const handleLogout = () => {
        setLoading(true);
        requestLogout(handleFinished);
    };

    return (
        <Button isIconOnly color='danger' variant='flat' onClick={handleLogout}>
            {loading ? <Spinner size='sm' color='danger' /> : <SignOutBoldIcon />}
        </Button>
    );
}

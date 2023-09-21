'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/button';

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

    const icon = loading ? null : <SignOutBoldIcon />;

    const handleFinished = () => {
        setLoading(false);
        router.refresh();
    };

    const handleLogout = () => {
        setLoading(true);
        requestLogout(handleFinished);
    };

    return (
        <Button
            color='danger'
            variant='bordered'
            size='lg'
            startContent={icon}
            isLoading={loading}
            onClick={handleLogout}
        >
            Sign Out
        </Button>
    );
}

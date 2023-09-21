'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { Button } from '@nextui-org/button';

import GoogleLogoIcon from '@/icons/google-logo';

const googleAuthProvider = new GoogleAuthProvider();

const requestLogin = async (onFinished: () => void) => {
    try {
        const res = await signInWithPopup(auth, googleAuthProvider);
        const credential = GoogleAuthProvider.credentialFromResult(res);

        await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                idToken: credential?.idToken,
            }),
        });
    } catch (error) {
        console.error(error);
    } finally {
        onFinished();
    }
};

export default function LoginButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const icon = loading ? null : <GoogleLogoIcon />;

    const handleFinished = () => {
        setLoading(false);
        router.refresh();
    };

    const handleLogin = () => {
        setLoading(true);
        requestLogin(handleFinished);
    };

    return (
        <Button
            color='primary'
            variant='flat'
            size='lg'
            startContent={icon}
            isLoading={loading}
            onClick={handleLogin}
        >
            Login with Google
        </Button>
    );
}

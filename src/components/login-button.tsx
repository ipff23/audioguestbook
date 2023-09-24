'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { Button } from '@nextui-org/button';

import GoogleLogoIcon from '@/icons/google-logo';

const googleAuthProvider = new GoogleAuthProvider();

const requestLogin = async (onFinished: () => void) => {
    try {
        const res = await signInWithRedirect(auth, googleAuthProvider);
        console.error('[FIREBASE AUTH] RESPONSE:', res);
        const credential = GoogleAuthProvider.credentialFromResult(res);

        await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                idToken: credential?.idToken,
            }),
        });
    } catch (error) {
        console.error('[FIREBASE AUTH] ERROR:', error);
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
        router.replace('/secret');
    };

    const handleLogin = () => {
        setLoading(true);
        requestLogin(handleFinished);
    };

    return (
        <Button
            color='primary'
            size='lg'
            startContent={icon}
            isLoading={loading}
            onClick={handleLogin}
        >
            Login with Google
        </Button>
    );
}

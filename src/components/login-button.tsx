'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Button } from '@nextui-org/button';

import GoogleLogoIcon from '@/icons/google-logo';

export default function LoginButton() {
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const icon = loading ? null : <GoogleLogoIcon />;

    const handleLogin = async () => {
        setLoading(true);
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
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

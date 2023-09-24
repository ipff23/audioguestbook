'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type SignInWithOAuthCredentials } from '@supabase/supabase-js';

import { Button } from '@nextui-org/button';

import GoogleLogoIcon from '@/icons/google-logo';

export default function LoginButton() {
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const icon = loading ? null : <GoogleLogoIcon />;

    const handleLogin = async () => {
        setLoading(true);
        const settings: SignInWithOAuthCredentials = {
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        };
        console.log(settings);
        await supabase.auth.signInWithOAuth(settings);
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

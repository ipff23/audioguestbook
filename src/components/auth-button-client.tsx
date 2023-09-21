'use client';
import LogoutButton from './logout-button';
import LoginButton from './login-button';

export default async function AuthButton({ isAuth }: { isAuth: boolean }) {
    if (!isAuth) {
        return <LoginButton />;
    }

    return <LogoutButton />;
}

'use server';
import { isAunthenticated } from '@/services/auth';
import AuthButtonClient from './auth-button-client';

export default async function AuthButton() {
    const isAuth = await isAunthenticated();
    return <AuthButtonClient isAuth={isAuth} />;
}

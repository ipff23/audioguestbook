import { cookies } from 'next/headers';
import { signInWithCredential, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { readUserById } from './users';
import type { NextRequest } from 'next/server';

interface Token {
    idToken: string;
}

export const COOKIE_KEY_AUTH_ID_TOKEN = 'AUTH_ID_TOKEN';

export const readUserByToken = async ({ idToken }: Token) => {
    try {
        const credential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(auth, credential);
        return result?.user;
    } catch (err) {
        return null;
    }
};

export const storeSession = ({ idToken }: Token) => {
    const cookieStore = cookies();
    cookieStore.set({
        name: COOKIE_KEY_AUTH_ID_TOKEN,
        value: idToken,
        httpOnly: true,
        secure: true,
    });
};

export const readSession = async () => {
    const cookieStore = cookies();
    if (!cookieStore.has(COOKIE_KEY_AUTH_ID_TOKEN)) {
        return null;
    }

    const idToken = cookieStore.get(COOKIE_KEY_AUTH_ID_TOKEN)?.value ?? '';
    const user = await readUserByToken({ idToken });
    return user;
};

export const readSessionFromRequest = async (request: NextRequest) => {
    const cookieStore = request.cookies;
    if (!cookieStore.has(COOKIE_KEY_AUTH_ID_TOKEN)) {
        return null;
    }

    const idToken = cookieStore.get(COOKIE_KEY_AUTH_ID_TOKEN)?.value ?? '';
    const user = await readUserByToken({ idToken });
    return user;
};

export const deleteSession = () => {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_KEY_AUTH_ID_TOKEN);
    signOut(auth);
};

export const isAunthenticated = async () => {
    const session = await readSession();

    if (session === null) {
        return false;
    }

    const { uid } = session;
    const user = await readUserById({ uid });

    if (user === null) {
        return false;
    }

    return true;
};

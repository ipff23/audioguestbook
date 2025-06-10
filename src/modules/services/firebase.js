import { z } from 'zod';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfigSchema = z.object({
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
});

const firebaseConfig = firebaseConfigSchema.parse({
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
});

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = async ({ email, password }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
};

export const logout = async () => {
    await signOut(auth);
};

export const updatePasswordWithAuth = async (email, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    await updatePassword(user, newPassword);

    const credential = EmailAuthProvider.credential(email, newPassword);
    await reauthenticateWithCredential(user, credential);
};

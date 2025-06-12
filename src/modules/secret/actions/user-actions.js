import { createUserWithEmailAndPassword } from 'firebase/auth';

import {
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import { auth, db, loginWithEmail, updatePasswordWithAuth } from '@/modules/core/services/firebase';

import { parseTimestamp } from '@/modules/core/helpers/dates';
import { tokenDecode } from '@/modules/core/helpers/crypto';

export const readAllUsers = async () => {
    const colRef = collection(db, 'users');
    const snapshot = await getDocs(colRef);
    return snapshot.docs
        .map(doc => doc.data())
        .map(user => ({
            ...user,
            createdAt: parseTimestamp(user.createdAt),
        }));
};

export const readUser = async ({ uid }) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
};

export const readAllUsersQuery = () => {
    return {
        queryKey: ['users'],
        queryFn: async () => {
            const users = await readAllUsers();
            return users;
        },
    };
};

export const readUserMuation = ({ ...args }) => {
    return {
        ...args,
        mutationFn: async ({ uid }) => {
            const user = await readUser({ uid });
            return user;
        },
    };
};

export const changePasswordMuation = ({ ...args }) => {
    return {
        ...args,
        mutationFn: async ({ uid, email, password }) => {
            await updatePasswordWithAuth(email, password);

            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, { firstTime: false, tempPassword: null });
        },
    };
};

export const createUserMutation = ({ ...args } = {}) => {
    return {
        ...args,
        mutationFn: async ({ name, email, tempPassword }) => {
            const encodedCredentials = localStorage.getItem('auth:credentials');

            const { user: authUser } = await createUserWithEmailAndPassword(
                auth,
                email,
                tempPassword,
            );

            const credentials = tokenDecode(encodedCredentials);
            const $auth = await loginWithEmail(credentials);
            console.log('User logged:', $auth);

            const docRef = doc(collection(db, 'users'), authUser.uid);

            const userData = {
                uid: authUser.uid,
                name,
                email,
                firstTime: true,
                tempPassword,
                createdAt: serverTimestamp(),
            };

            await setDoc(docRef, userData);

            return userData;
        },
    };
};

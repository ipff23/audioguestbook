import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, dbCollections } from '@/services/firebase';

interface UserId {
    uid: string;
}

export const readUserById = async ({ uid }: UserId) => {
    const usersDoc = doc(db, dbCollections.USERS, uid);
    const usersSnapshot = await getDoc(usersDoc);

    if (!usersSnapshot.exists()) {
        return null;
    }

    return usersSnapshot.data();
};

export const createUser = async ({ uid }: UserId) => {
    const usersDoc = doc(db, dbCollections.USERS, uid);
    const usersSnapshot = await getDoc(usersDoc);

    if (usersSnapshot.exists()) {
        return usersSnapshot.data();
    }

    const userData = {
        uid,
        isAdmin: false,
    };

    await setDoc(usersDoc, userData);

    return userData;
};

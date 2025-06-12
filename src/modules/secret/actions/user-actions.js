import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, updatePasswordWithAuth } from '@/modules/core/services/firebase';

export const readUser = async ({ uid }) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
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
            await updateDoc(userRef, { firstTime: false });
        },
    };
};

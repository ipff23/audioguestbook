import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/modules/services/firebase';

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

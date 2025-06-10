import { doc, updateDoc } from 'firebase/firestore';
import { db, updatePasswordWithAuth } from '@/modules/services/firebase';

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

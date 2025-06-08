import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/modules/services/firebase';

export const saveUser = async user => {
    const userRef = doc(db, 'users', user.uid);

    await setDoc(
        userRef,
        {
            uid: user.uid,
            display_name: user.displayName,
            email: user.email,
            photo_url: user.photoURL,
            created_at: serverTimestamp(),
        },
        { merge: true },
    );

    return user.uid;
};

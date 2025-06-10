import { nanoid } from 'nanoid';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/modules/core/services/firebase';

export const createBook = async ({ cover, date, name }) => {
    const id = nanoid();
    const docRef = doc(collection(db, 'books'), id);

    await setDoc(docRef, {
        id,
        nanoid: id,
        cover,
        date,
        name,
        created_at: serverTimestamp(),
    });

    return id;
};

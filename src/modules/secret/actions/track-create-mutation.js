import { nanoid } from 'nanoid';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/modules/core/services/firebase';

export const createTrack = async ({
    bookId,
    url,
    name = null,
    duration = null,
    hash = null,
    index = null,
}) => {
    const id = nanoid();
    const trackRef = doc(collection(db, 'tracks'));
    const bookRef = doc(db, 'books', bookId);

    await setDoc(trackRef, {
        id,
        nanoid: id,
        url,
        name,
        duration,
        hash,
        index,
        book_ref: bookRef,
        created_at: serverTimestamp(),
    });

    return trackRef.id;
};

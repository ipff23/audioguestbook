import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/modules/core/services/firebase';
import { nanoid } from '@/modules/core/helpers/utils';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadImage = async (path = 'images/', file) => {
    const storageRef = ref(storage, `${path}${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};

export const createBook = async ({ cover, name, date }) => {
    const id = nanoid();
    const docRef = doc(collection(db, 'books'), id);

    const coverUrl = await uploadImage('covers/', cover);

    const bookData = {
        id,
        nanoid: id,
        cover: coverUrl,
        name,
        date,
        createdAt: serverTimestamp(),
    };

    await setDoc(docRef, bookData);

    return bookData;
};

export const createBookMutation = ({ ...args } = {}) => {
    return {
        ...args,
        mutationFn: async ({ cover, name, date }) => {
            const bookData = await createBook({ cover, name, date });
            return bookData;
        },
    };
};

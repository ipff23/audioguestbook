import {
    collection,
    doc,
    setDoc,
    serverTimestamp,
    getDoc,
    getDocs,
    deleteDoc,
} from 'firebase/firestore';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '@/modules/core/services/firebase';

import { nanoid } from '@/modules/core/helpers/utils';
import { parseTimestamp } from '@/modules/core/helpers/dates';

export const uploadImage = async (path, file) => {
    const storageRef = ref(storage, `${path}${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};

export const readSingleBook = async ({ id }) => {
    const bookRef = doc(db, 'books', id);
    const bookSnap = await getDoc(bookRef);
    return bookSnap.exists() ? bookSnap.data() : null;
};

export const readAllBooks = async () => {
    const colRef = collection(db, 'books');
    const snapshot = await getDocs(colRef);
    return snapshot.docs
        .map(doc => doc.data())
        .map(book => ({
            ...book,
            date: parseTimestamp(book.date),
        }));
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

export const removeBook = async id => {
    const bookRef = doc(db, 'books', id);
    await deleteDoc(bookRef);
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

export const readSingleBookQuery = ({ id, ...args } = {}) => {
    return {
        ...args,
        queryKey: ['book', id],
        queryFn: async () => {
            const book = await readSingleBook({ id });
            return book;
        },
    };
};

export const readAllBooksQuery = ({ ...args } = {}) => {
    return {
        ...args,
        queryKey: ['books'],
        queryFn: readAllBooks,
    };
};

export const removeBookMutation = ({ ...args } = {}) => {
    return {
        ...args,
        mutationFn: async id => {
            await removeBook(id);
        },
    };
};

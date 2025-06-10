import { db } from '@/modules/core/services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const readAllBooks = async () => {
    const colRef = collection(db, 'books');
    const snapshot = await getDocs(colRef);
    return snapshot.docs
        .map(doc => doc.data())
        .map(book => ({
            ...book,
            date: new Date(book.date.seconds * 1000),
        }));
};

export const readAllBooksQueery = ({ ...args } = {}) => {
    return {
        ...args,
        queryKey: ['books'],
        queryFn: readAllBooks,
    };
};

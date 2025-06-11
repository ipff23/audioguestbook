import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/modules/core/services/firebase';
import { parseTimestamp } from '@/modules/core/helpers/dates';

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

export const readAllBooksQueery = ({ ...args } = {}) => {
    return {
        ...args,
        queryKey: ['books'],
        queryFn: readAllBooks,
    };
};

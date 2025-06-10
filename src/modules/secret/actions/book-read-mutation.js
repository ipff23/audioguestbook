import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/modules/core/services/firebase';

export const readBook = async ({ id }) => {
    const bookRef = doc(db, 'books', id);
    const bookSnap = await getDoc(bookRef);
    return bookSnap.exists() ? bookSnap.data() : null;
};

export const readBookQuery = ({ id, ...args } = {}) => {
    return {
        ...args,
        queryKey: ['book', id],
        queryFn: async () => {
            const book = await readBook({ id });
            console.log('readBookQuery', book);
            return book;
        },
    };
};

import { Layout } from '@/modules/secret/components/layout';
import { BookCreate } from '@/modules/secret/dialogs/book-create';

export const BooksAll = () => {
    return (
        <Layout title='Todos los Books'>
            <BookCreate />

            <div className='flex-center min-h-screen'>
                <h1 className='text-4xl font-barlow font-bold italic uppercase'>All Books</h1>
            </div>
        </Layout>
    );
};

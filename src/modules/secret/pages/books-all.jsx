import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';

import { Logo } from '@/modules/main/components/logo';
import { BookCreate } from '@/modules/secret/dialogs/book-create';

export const BooksAll = () => {
    return (
        <WithAuth>
            <Layout title='Todos los Books'>
                <BookCreate />

                <div className='flex-center min-h-screen'>
                    <Logo className='text-4xl'>All Books</Logo>
                </div>
            </Layout>
        </WithAuth>
    );
};

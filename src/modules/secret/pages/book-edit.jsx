import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';

import { Logo } from '@/modules/main/components/logo';

export const BooksEdit = () => {
    return (
        <WithAuth>
            <Layout title='Editar Book'>
                <div className='flex-center min-h-screen'>
                    <Logo className='text-4xl'>Books Edit</Logo>
                </div>
            </Layout>
        </WithAuth>
    );
};

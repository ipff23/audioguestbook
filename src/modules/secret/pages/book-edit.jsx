import { Logo } from '@/modules/main/components/logo';
import { Layout } from '@/modules/secret/components/layout';

export const BooksEdit = () => {
    return (
        <Layout title='Editar Book'>
            <div className='flex-center min-h-screen'>
                <Logo className='text-4xl'>Books Edit</Logo>
            </div>
        </Layout>
    );
};

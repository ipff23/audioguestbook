import { Logo } from '@/modules/main/components/logo';
import { Layout } from '@/modules/secret/components/layout';

export const UsersAll = () => {
    return (
        <Layout title='Todos los Usuarios'>
            <div className='flex-center min-h-screen'>
                <Logo className='text-4xl'>All Users</Logo>
            </div>
        </Layout>
    );
};

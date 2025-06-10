import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';

import { Logo } from '@/modules/main/components/logo';

export const UsersAll = () => {
    return (
        <WithAuth>
            <Layout title='Todos los Usuarios'>
                <div className='flex-center min-h-screen'>
                    <Logo className='text-4xl'>All Users</Logo>
                </div>
            </Layout>
        </WithAuth>
    );
};

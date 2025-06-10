import { useQuery } from '@tanstack/react-query';

import { readBookQuery } from '@/modules/secret/actions/book-read-mutation';

import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';

import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { JsonViewer } from '@/modules/core/components/json-viewer';

export const BooksEdit = ({ params: { id } }) => {
    const { data: book, isLoading } = useQuery(readBookQuery({ id }));

    if (isLoading) {
        return (
            <WithAuth>
                <Layout title='Editar Book'>
                    <div className='p-4'>
                        <Skeleton className='h-48 w-full' />
                    </div>
                </Layout>
            </WithAuth>
        );
    }

    return (
        <WithAuth>
            <Layout title='Editar Book'>
                <div className='p-4'>
                    <JsonViewer data={book} expanded />
                </div>
            </Layout>
        </WithAuth>
    );
};

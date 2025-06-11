import { useQuery } from '@tanstack/react-query';

import { readBookQuery } from '@/modules/secret/actions/book-read-mutation';

import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';

import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { JsonDebugger } from '@/modules/core/components/json-debugger';

import { BookCard } from '../components/book-editor/book-card';
import { DropZone } from '../components/book-editor/drop-zone';
import { TrackListManager } from '../components/book-editor/track-list-manager';

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
                <div className='grid grid-cols-[14rem_70ch] grid-rows-[1fr] [grid-template-areas:"side_main"] w-full min-h-[calc(100svh-3.5rem)] overflow-hidden'>
                    <BookCard className='[grid-area:side] border-r' book={book} />

                    <div className='[grid-area:main] relative p-4 flex flex-col gap-4'>
                        <JsonDebugger name='book' data={book} />
                        <DropZone />
                        <TrackListManager />
                    </div>
                </div>
            </Layout>
        </WithAuth>
    );
};

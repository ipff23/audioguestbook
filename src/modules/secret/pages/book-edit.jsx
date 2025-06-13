import { useQuery } from '@tanstack/react-query';

import { readSingleBookQuery } from '@/modules/secret/actions/book-actions';

import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';
import { BookEditor } from '@/modules/secret/components/book-editor/book-editor';

import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { readAllTracksQuery } from '../actions/track-actions';
import { sortBy } from '@/modules/core/helpers/arrays';

export const BooksEdit = ({ params: { id } }) => {
    const { data: book, isLoading: bookLoading } = useQuery(readSingleBookQuery({ id }));
    const { data: tracks, isLoading: tracksLoading } = useQuery(readAllTracksQuery({ bookId: id }));

    if (bookLoading || tracksLoading) {
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

    const sortedTracks = sortBy(tracks, 'index');

    return (
        <WithAuth>
            <Layout title='Editar Book'>
                <BookEditor book={book} tracks={sortedTracks} />
            </Layout>
        </WithAuth>
    );
};

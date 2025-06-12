import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

import { cn } from '@/modules/core/helpers/utils';
import { sortBy } from '@/modules/core/helpers/arrays';
import { useDocumentClassNames } from '@/modules/core/hooks/use-document-class-names';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';

import { readSingleBookQuery } from '@/modules/secret/actions/book-actions';
import { readAllTracksQuery } from '@/modules/secret/actions/track-actions';

import { Loader } from '@/modules/core/components/loader';

import { TrackListProvider } from '@/modules/main/providers/track-list-provider';
import { Player } from '@/modules/main/components/book-player/player';
import { Playlist } from '@/modules/main/components/book-player/playlist';

export const Book = ({ params: { id } }) => {
    const [theme] = useDarkMode();

    const { data: book, isLoading: bookLoading } = useQuery(readSingleBookQuery({ id }));
    const { data: tracks, isLoading: tracksLoading } = useQuery(readAllTracksQuery({ bookId: id }));

    useDocumentClassNames({
        root: theme,
        body: 'antialiased',
    });

    if (bookLoading || tracksLoading) {
        return <Loader />;
    }

    const sortedTracks = sortBy(tracks, 'index');

    return (
        <TrackListProvider>
            <Helmet defaultTitle='Guestbook' titleTemplate='%s | Guestbook'>
                {book.name && <title>{book.name}</title>}
            </Helmet>

            <main
                className={cn('group relative  bg-cover bg-no-repeat bg-center bg-fixed')}
                style={{
                    backgroundImage: `url(${book.cover})`,
                }}
            >
                <div
                    className={cn(
                        'overlay w-full min-h-screen flex-center bg-white/50 backdrop-blur-lg',
                        'dark:bg-gray-900/70',
                    )}
                >
                    <div className={cn('w-full sm:w-auto flex flex-row')}>
                        <Player book={book} tracks={sortedTracks} />
                        <Playlist book={book} tracks={sortedTracks} />
                    </div>
                </div>
            </main>
        </TrackListProvider>
    );
};

import { useQueryState } from 'nuqs';
import { cn } from '@/modules/core/helpers/utils';
import { parseAsShorthandBoolean } from '@/modules/core/helpers/nuqs';

import { sortBy } from '@/modules/core/helpers/arrays';

import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';
import { useBreakpoint } from '@/modules/core/hooks/use-breakpoint';
import { useTrackList } from '@/modules/main/providers/track-list-provider';

import { ScrollArea } from '@/modules/shadcn/ui/scroll-area';

import { Drawer, DrawerContent } from '@/modules/shadcn/ui/drawer';

import { TrackItem } from './track-item';
import { MiniPlayer } from './mini-player';

export const Playlist = ({ book, tracks = [] }) => {
    const [theme] = useDarkMode();
    const breakpoint = useBreakpoint('xs');
    const [playlist, togglePlaylist] = useQueryState('playlist', parseAsShorthandBoolean);

    const {
        // ...
        playing,
        buffering,
        currentTime,
        duration,
        currentTrack,
        currentTrackNo,
        start,
        play,
        playAt,
        pause,
        seek,
    } = useTrackList();

    const handleSeek = ({ value }) => {
        seek(value, true);
    };

    const handlePlay = () => {
        if (!currentTrack) {
            start();
        } else {
            play();
        }
    };

    if (['xs', 'sm'].includes(breakpoint)) {
        return (
            <Drawer modal={false} open={playlist} onOpenChange={togglePlaylist}>
                <DrawerContent
                    className={cn('dark:bg-gray-800 !h-full !max-h-[calc(100%-4rem)]')}
                    style={{
                        '--muted':
                            theme === 'dark' ? 'var(--color-gray-700)' : 'var(--color-gray-200)',
                    }}
                >
                    <div
                        className={cn(
                            'relative w-full sm:max-w-[400px] mx-auto flex flex-col h-full pb-4',
                            {
                                'translate-x-full': !playlist,
                            },
                        )}
                    >
                        <ScrollArea className={cn('flex-1 h-auto w-full p-4 pb-0 overflow-hidden')}>
                            {sortBy(tracks, 'index').map((track, index) => (
                                <TrackItem
                                    key={track.nanoid}
                                    playing={playing && currentTrackNo === index}
                                    book={book}
                                    track={track}
                                    trackNo={index}
                                    onPlay={playAt}
                                    onPause={pause}
                                />
                            ))}
                        </ScrollArea>
                        <MiniPlayer
                            className='h-16 w-[calc(100%-2rem)] mx-4 mb-4 sm:mx-0 sm:max-w-[400px]'
                            book={book}
                            tracks={tracks}
                            playing={playing}
                            buffering={buffering}
                            currentTrackNo={currentTrackNo}
                            duration={duration}
                            currentTime={currentTime}
                            onPlay={handlePlay}
                            onPause={pause}
                            onTimeChange={handleSeek}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <div
            className={cn(
                'absolute w-[400px] h-[600px] overflow-hidden bg-white rounded-r-xl opacity-0 transition-[translate,opacity]',
                'dark:bg-gray-800',
                {
                    'translate-x-[400px] opacity-100': playlist,
                },
            )}
        >
            <ScrollArea className={cn('h-full w-full p-4')}>
                {tracks.map((track, index) => (
                    <TrackItem
                        key={track.nanoid}
                        playing={playing && currentTrackNo === index}
                        book={book}
                        track={track}
                        trackNo={index}
                        onPlay={playAt}
                        onPause={pause}
                    />
                ))}
            </ScrollArea>
        </div>
    );
};

import { useQueryState } from 'nuqs';
import { format } from 'date-fns';
import { ListMusic, X } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { parseAsShorthandBoolean } from '@/modules/core/helpers/nuqs';
import { parseTimestamp } from '@/modules/core/helpers/dates';

import { ToggleIcon } from '@/modules/shadcn/ui/toggle-icon';
import { DarkModeToggle } from '@/modules/core/components/dark-mode-toggle';

import { Logo } from '../logo';

import { Trackbar } from './trackbar';
import { RepeatButton } from './repeat-button';
import { SkipBackButton } from './skip-back-button';
import { PlayPauseButton } from './play-pause-button';
import { SkipFowardButton } from './skip-foward-button';
import { ShuffleButton } from './shuffle-button';
import { Timer } from './timer';

export const Player = ({ book }) => {
    const [playlist, togglePlaylist] = useQueryState('playlist', parseAsShorthandBoolean);

    return (
        <div
            className={cn(
                'relative z-1 w-full sm:w-[400px] h-[100svh] sm:h-[600px] sm:rounded-xl transition-[border-radius,margin]',
                'text-foreground bg-gray-100/60 dark:bg-gray-700/50 backdrop-blur-lg backdrop-saturate-150',
                'grid grid-rows-[auto_1fr_auto_auto] pb-8 sm:pb-4',
                {
                    'md:rounded-r-none md:mr-[400px]': playlist,
                },
            )}
        >
            <div className='flex items-center justify-between p-4'>
                <Logo className='text-2xl' />
                <div className='flex items-center gap-2'>
                    <DarkModeToggle className=" hover:bg-foreground/10 hover:text-foreground [&_svg:not([class*='size-'])]:size-5" />
                    <ToggleIcon
                        className='data-[state=on]:bg-transparent hover:bg-foreground/10 hover:text-foreground'
                        variant='ghost'
                        pressed={playlist}
                        onPressedChange={togglePlaylist}
                        icons={{
                            on: <X className='size-6' />,
                            off: <ListMusic className='size-6' />,
                        }}
                    />
                </div>
            </div>

            <div className='flex-center flex-col p-4'>
                <img
                    src={book.cover}
                    className='mb-8 size-64 sm:size-52 object-cover rounded-2xl shadow-2xl'
                />
                <h1 className='text-2xl font-bold'>{book.name}</h1>
                <p className='text-sm text-muted-foreground'>
                    {format(parseTimestamp(book.date), 'PPP')}
                </p>
            </div>

            <div className='px-16 py-4'>
                <Trackbar />
                <Timer />
            </div>

            <div className='flex-center gap-2 p-4'>
                <RepeatButton />
                <SkipBackButton />
                <PlayPauseButton />
                <SkipFowardButton />
                <ShuffleButton />
            </div>
        </div>
    );
};

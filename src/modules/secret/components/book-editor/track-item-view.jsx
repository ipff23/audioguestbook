import { Download, GripVertical, Loader2, Trash } from 'lucide-react';

import { cn, styled } from '@/modules/core/helpers/utils';

import { Button } from '@/modules/shadcn/ui/button';
import { Input } from '@/modules/shadcn/ui/input';
import { TrackPlayer } from './track-player';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { makeDownloadLink } from '@/modules/core/helpers/strings';

const Wrapper = styled(
    'div',
    cn(
        'select-none relative overflow-hidden grid gap-2 py-2 pl-1 pr-2',
        'grid-cols-[1.5rem_auto_1fr_auto] grid-rows-[auto_auto] [grid-template-areas:"grip_number_name_trash"_"._._player_download"]',
        'bg-gray-100 dark:bg-gray-800 rounded-lg',
    ),
);

export const TrackItemView = ({
    index = 0,
    name = '',
    track,
    source,
    isLoading,
    isSaving,
    isDragging,
    listeners,
    setActivatorNodeRef,
    onNameChange,
    onDurationChange,
    onRemove,
}) => {
    if (isLoading) {
        return (
            <Wrapper className='cursor-wait'>
                <div className='[grid-area:number] flex-center'>
                    <Skeleton className='size-6 rounded-md bg-blue-200 dark:bg-blue-500/30' />
                </div>

                <Skeleton
                    className={cn('[grid-area:name] h-9 rounded-md bg-white dark:bg-neutral-800')}
                />
                <Skeleton
                    className={cn('[grid-area:player] h-11 rounded-lg bg-white dark:bg-gray-700')}
                />

                <dvi className='[grid-area:trash] w-9' />
            </Wrapper>
        );
    }

    return (
        <Wrapper className={cn({ 'cursor-grabbing shadow-2xl scale-105': isDragging })}>
            {isSaving && (
                <div className='absolute top-0 left-0 h-full w-full flex flex-row gap-4 items-center justify-center bg-slate-100/30 dark:bg-slate-500/50 backdrop-blur-sm z-50'>
                    <Loader2 className='animate-spin' />
                </div>
            )}

            <div className='[grid-area:grip] flex-center'>
                <button
                    className={cn(
                        'flex-center h-6 w-5 text-neutral-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-sm [&_svg]:size-4',
                        {
                            'cursor-grabbing bg-black/20': isDragging,
                        },
                    )}
                    ref={setActivatorNodeRef}
                    {...listeners}
                >
                    <GripVertical />
                </button>
            </div>

            <div className='[grid-area:number] flex-center'>
                <span className='flex-center p-1 size-6 bg-blue-200 text-blue-600 dark:bg-blue-500/30 dark:text-blue-100/60 text-xs font-bold rounded-md'>
                    {index + 1}
                </span>
            </div>

            <Input
                className={cn('[grid-area:name] bg-white dark:bg-neutral-800', {
                    'ring-2 ring-red-500': name.trim().length === 0,
                })}
                value={name}
                onChange={ev => onNameChange?.(ev.target.value)}
            />

            <TrackPlayer
                className='[grid-area:player]'
                id={track?.nanoid}
                source={source}
                onDurationChange={onDurationChange}
            />

            <Button
                className={cn(
                    '[grid-area:trash] bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600',
                    'dark:bg-red-500/30 dark:text-red-300/60 dark:hover:bg-red-700/50 dark:hover:text-red-300',
                )}
                size='icon'
                variant='secondary'
                onClick={() => onRemove?.(track?.nanoid)}
            >
                <Trash />
            </Button>

            {track.type === 'stored' && (
                <Button
                    className={cn(
                        '[grid-area:download] bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-600',
                        'dark:bg-blue-500/30 dark:text-blue-300/60 dark:hover:bg-blue-700/50 dark:hover:text-blue-300',
                    )}
                    size='icon'
                    variant='secondary'
                    asChild
                >
                    <a href={makeDownloadLink(track)} download={name}>
                        <Download />
                    </a>
                </Button>
            )}
        </Wrapper>
    );
};

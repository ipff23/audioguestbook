'use client';
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Chip } from '@nextui-org/chip';
import { Progress } from '@nextui-org/progress';
import { Skeleton } from '@nextui-org/skeleton';

import { type EditableTrack } from '@/types/books';
import { cn } from '@/helpers/utils';

import DragHandleIcon from '@/icons/drag-handle-regular';
import TrashIcon from '@/icons/trash-regular';
import DownloadIcon from '@/icons/download-regular';

import TrackPlayer from './track-player';

export interface TrackItemViewProps {
    index: number;
    name: string;
    track: EditableTrack;
    source?: string;
    isLoading?: boolean;
    isSaving?: boolean;
    isDragging?: boolean;
    listeners?: SyntheticListenerMap;
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    onNameChange?: (name: string) => void;
    onDurationChange?: (duration: number) => void;
    onRemove?: (id: string) => void;
    onDownload?: () => void;
}

export default function TrackItemView({
    index,
    name,
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
    onDownload,
}: TrackItemViewProps) {
    if (isLoading) {
        return (
            <div className='select-none w-full flex flex-col gap-2 p-2 bg-slate-100/70 dark:bg-slate-500/50 rounded-lg'>
                <div className='flex flex-row items-center gap-3'>
                    <div className='hover:bg-black/10 py-1 px-0 -mr-1.5 rounded-md'>
                        <DragHandleIcon />
                    </div>

                    <Skeleton className='flex rounded-md w-5 h-5 bg-primary/20' />

                    <Skeleton className='flex flex-1 rounded-md h-8 mr-[52px]' />
                </div>

                <div className='flex-1 ml-[56px] mr-[52px]'>
                    <div className='flex flex-1 flex-row items-center gap-3 p-2 pr-4 bg-slate-100/70 dark:bg-slate-500/50 rounded-lg'>
                        <Skeleton className='flex rounded-full w-8 h-8' />
                        <Skeleton className='flex flex-1 rounded-full h-2' />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'select-none w-full flex flex-col gap-1 transition-all p-2 bg-slate-100/70 dark:bg-slate-500/50 rounded-lg cursor-default relative overflow-hidden',
                {
                    'cursor-grabbing shadow-2xl scale-105': isDragging,
                },
            )}
        >
            {isSaving && (
                <div className='absolute top-0 left-0 h-full w-full flex flex-col gap-4 items-center justify-center bg-slate-100/30 dark:bg-slate-500/50 backdrop-blur-sm z-50'>
                    <p className='drop-shadow-lg'>Saving & Uploading...</p>
                    <Progress className='max-w-xs' size='sm' color='success' isIndeterminate />
                </div>
            )}

            <div className='flex flex-row items-center gap-3'>
                <button
                    className={cn(
                        'cursor-grab hover:bg-black/10 py-1 px-0 -mr-1.5 rounded-md transition-all',
                        {
                            'cursor-grabbing bg-black/20': isDragging,
                        },
                    )}
                    ref={setActivatorNodeRef}
                    {...listeners}
                >
                    <DragHandleIcon />
                </button>

                <Chip size='sm' radius='sm' variant='flat' color='primary'>
                    {index + 1}
                </Chip>

                <div className='flex flex-1 flex-col gap-1'>
                    <Input
                        type='text'
                        placeholder='Track name'
                        size='sm'
                        radius='sm'
                        value={name}
                        isInvalid={name.trim().length === 0}
                        onChange={ev => onNameChange?.(ev.target.value)}
                    />
                </div>

                <Button
                    variant='flat'
                    color='danger'
                    onClick={() => onRemove?.(track.nanoid)}
                    isIconOnly
                >
                    <TrashIcon />
                </Button>
            </div>

            <div className='flex-1 flex flex-row items-center ml-[60px] gap-3'>
                <TrackPlayer
                    id={track.nanoid}
                    source={source}
                    onDurationChange={onDurationChange}
                />

                <Button
                    as='a'
                    variant='flat'
                    color='primary'
                    href={`/track/${track.nanoid}`}
                    download
                    isIconOnly
                >
                    <DownloadIcon />
                </Button>
            </div>
        </div>
    );
}

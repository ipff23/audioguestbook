'use client';
import {
    type ChangeEvent,
    type MouseEvent,
    type DragEvent,
    useRef,
    useState,
    useEffect,
} from 'react';
import { useMap } from 'ahooks';

import { type Track } from '@/types/books';

import { cn, nanoid } from '@/helpers/utils';
import { fileListToArray } from '@/helpers/arrays';
import { hasAllowedType } from '@/helpers/asserts';

import CasseteTapeIcon from '@/icons/cassette-tape-regular';

import TrackItem from './track-item';
import { createFileFromUrl } from '@/helpers/files';

export interface FileItem {
    id: string;
    name: string;
    file: File;
}

export interface TrackListProps {
    bookId: string;
    tracks: Track[];
    disabled?: boolean;
    onChange?: (fileItems: FileItem[]) => void;
    onLoading?: (loading: boolean) => void;
}

const allowedTypes = 'audio/mpeg';

export default function TrackList({
    bookId,
    tracks = [],
    disabled = false,
    onChange,
    onLoading,
}: TrackListProps) {
    const $input = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [tracksSources, tracksSourcesManager] = useMap<string, File>();
    const [tracksLoading, tracksLoadingManager] = useMap<string, boolean>();
    const [tracksRegistered, tracksRegisteredManager] = useMap<string, boolean>();

    const processFileList = (fileList: FileList | null) => {
        if (fileList === null) return;

        fileListToArray(fileList).forEach((file: File) => {
            if (hasAllowedType(file, allowedTypes)) {
                const id = nanoid();
                tracksSourcesManager.set(id, file);
                tracksLoadingManager.set(id, false);
                tracksRegisteredManager.set(id, false);
            }
        });
    };

    const handleTrigger = (ev: MouseEvent) => {
        ev.preventDefault();
        $input.current?.click();
    };

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        processFileList(ev.target.files);
        ev.target.value = '';
    };

    const handleRemove = (id: string) => {
        tracksSourcesManager.remove(id);
        tracksLoadingManager.remove(id);
    };

    const handleDragOver = (ev: DragEvent) => {
        ev.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (ev: DragEvent) => {
        ev.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (ev: DragEvent) => {
        ev.preventDefault();
        setDragOver(false);

        if (disabled) {
            return;
        }

        processFileList(ev.dataTransfer.files);
    };

    const handleCreate = (id: string) => {
        tracksLoadingManager.set(id, false);
    };

    useEffect(() => {
        const isLoading = Array.from(tracksLoading).some(([_, loading]) => loading);
        onLoading?.(isLoading);
    }, [tracksLoading]);

    useEffect(() => {
        const fileItems = Array.from(tracksSources).map(
            ([id, file]): FileItem => ({
                id,
                file,
                name: file.name,
            }),
        );
        onChange?.(fileItems);
    }, [tracksLoading]);

    useEffect(() => {
        tracks.forEach(async track => {
            const file = await createFileFromUrl(track.url);

            tracksSourcesManager.set(track.nanoid, file);
            tracksLoadingManager.set(track.nanoid, false);
            tracksRegisteredManager.set(track.nanoid, true);
        });
    }, [tracks]);

    return (
        <div
            className={cn(
                'w-full min-h-[220px] flex flex-col gap-4 bg-transparent border-dashed border-2 border-default-200 rounded-lg p-6 transition-all',
                {
                    'border-default-400': dragOver,
                    'border-red-400': dragOver && disabled,
                    'opacity-50': disabled,
                },
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                ref={$input}
                className='hidden'
                type='file'
                accept={allowedTypes}
                onChange={handleChange}
                disabled={disabled}
                multiple
            />
            <button
                className='flex-1 flex flex-col justify-center items-center p-6 bg-slate-100/50 dark:bg-slate-800/50 rounded-md text-xs dark:text-white cursor-pointer'
                onClick={handleTrigger}
            >
                <CasseteTapeIcon size='1.5rem' />
                Drop or Browse some Tracks
            </button>

            {Array.from(tracksSources).map(([id, file]: [string, File]) => (
                <TrackItem
                    key={id}
                    bookId={bookId}
                    id={id}
                    file={file}
                    registerd={Boolean(tracksRegistered.get(id))}
                    onRemove={handleRemove}
                    onCreated={handleCreate}
                />
            ))}
        </div>
    );
}

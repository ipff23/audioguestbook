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

import { cn, nanoid } from '@/helpers/utils';
import { fileListToArray } from '@/helpers/arrays';

import CasseteTapeIcon from '@/icons/cassette-tape-regular';

import TrackItem from './track-item';

export interface FileItem {
    id: string;
    name: string;
    file: File;
}

export interface TrackListProps {
    disabled?: boolean;
    onChange?: (files: FileItem[]) => void;
}

const allowedTypes = 'audio/mpeg';

export default function TrackList({ disabled = false, onChange }: TrackListProps) {
    const $input = useRef<HTMLInputElement>(null);
    const [tracksSources, { set: setTrack, remove: removeTrack }] = useMap<string, File>();
    const [dragOver, setDragOver] = useState(false);

    const processFileList = (fileList: FileList | null) => {
        if (fileList === null) {
            return;
        }

        const files = fileListToArray(fileList);

        files.forEach((file: File) => {
            const isAllowed = allowedTypes.split(',').some(type => type.trim() === file?.type);
            if (isAllowed) {
                setTrack(nanoid(), file);
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
        removeTrack(id);
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

    useEffect(() => {
        const tracks = Array.from(tracksSources).map(([id, file]) => ({
            id,
            file,
            name: file.name,
        }));
        onChange?.(tracks);
    }, [tracksSources]);

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
                <TrackItem key={id} id={id} file={file} onRemove={handleRemove} />
            ))}
        </div>
    );
}

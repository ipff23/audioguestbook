'use client';
import { type ChangeEvent, type MouseEvent, type DragEvent, useRef, useState } from 'react';

import { cn, nanoid } from '@/helpers/utils';
import { fileListToArray } from '@/helpers/arrays';
import { hasAllowedType } from '@/helpers/asserts';

import CasseteTapeIcon from '@/icons/cassette-tape-regular';
import { useEvents } from '@/providers/bus-provider';

export interface TrackListProps {
    disabled?: boolean;
}

const allowedTypes = 'audio/mpeg';

export default function DropZone({ disabled = false }: TrackListProps) {
    const $input = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);

    const { emit } = useEvents();

    const processFileList = (fileList: FileList | null) => {
        if (fileList === null) return;

        const files = fileListToArray(fileList);
        const allowedFiles = files.filter((file: File) => hasAllowedType(file, allowedTypes));

        const tracks = allowedFiles.map(file => {
            return {
                file,
                nanoid: nanoid(),
                name: file.name,
            };
        });

        emit('drop-zone:change', tracks);
    };

    const handleTrigger = (ev: MouseEvent) => {
        ev.preventDefault();
        $input.current?.click();
    };

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        processFileList(ev.target.files);
        ev.target.value = '';
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

    return (
        <div
            className={cn(
                'w-full flex flex-col gap-4 bg-transparent border-dashed border-2 border-default-200 rounded-lg p-2 transition-all',
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
                className={cn(
                    'flex-1 flex flex-col justify-center items-center p-8 bg-slate-100/50 dark:bg-slate-800/50 rounded-md text-xs dark:text-white cursor-pointer transition-all',
                    {
                        'bg-slate-100 dark:bg-slate-800': dragOver,
                    },
                )}
                onClick={handleTrigger}
            >
                <CasseteTapeIcon size='1.5rem' />
                Drop or Browse some Tracks
            </button>
        </div>
    );
}

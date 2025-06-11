import { useRef, useState } from 'react';
import { CassetteTape } from 'lucide-react';

import { cn, hasAllowedType, nanoid } from '@/modules/core/helpers/utils';
import { useEvents } from '@/modules/core/providers/bus-provider';

const allowedTypes = 'audio/mpeg';

export const DropZone = ({ className, disabled }) => {
    const $picker = useRef(null);
    const [dragOver, setDragOver] = useState(false);

    const { emit } = useEvents();

    const processFileList = fileList => {
        if (fileList === null) return;

        const files = Array.from(fileList);
        const allowedFiles = files.filter(file => hasAllowedType(file, allowedTypes));

        const tracks = allowedFiles.map(file => ({
            file,
            nanoid: nanoid(),
            name: file.name,
        }));

        emit('drop-zone:change', tracks);
    };

    const handleTrigger = ev => {
        ev.preventDefault();
        $picker.current?.click();
    };

    const handleChange = ev => {
        processFileList(ev.target.files);
        ev.target.value = '';
    };

    const handleDragOver = ev => {
        ev.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = ev => {
        ev.preventDefault();
        setDragOver(false);
    };

    const handleDrop = ev => {
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
                'p-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl transition-all',
                {
                    'border-blue-500 dark:border-sky-700': dragOver,
                    'border-red-500 dark:border-red-700': dragOver && disabled,
                    'opacity-50': disabled,
                },
                className,
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                ref={$picker}
                className='hidden'
                type='file'
                accept={allowedTypes}
                onChange={handleChange}
                disabled={disabled}
                multiple
            />

            <button
                className={cn(
                    'flex flex-col items-center justify-center gap-2 w-full h-24 bg-gray-200 text-gray-600 rounded-lg transition-all',
                    'dark:bg-gray-800 dark:text-gray-400',
                    {
                        'bg-slate-200 dark:bg-slate-700': dragOver,
                    },
                )}
                onClick={handleTrigger}
            >
                <CassetteTape />
                <span className='text-sm'>Arrastra o Busca algún Track</span>
            </button>
        </div>
    );
};

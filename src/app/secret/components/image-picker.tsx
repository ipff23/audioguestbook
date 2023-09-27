'use client';
import {
    type ChangeEvent,
    type MouseEvent,
    type DragEvent,
    useRef,
    useState,
    useEffect,
} from 'react';

import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';

import { cn } from '@/helpers/utils';

import SearchIcon from '@/icons/file-search-regular';
import TrashIcon from '@/icons/trash-regular';
import { hasAllowedType } from '@/helpers/asserts';

const allowedTypes = 'image/png, image/jpeg';

export interface ImagePickerProps {
    disabled?: boolean;
    onChange?: (file: File) => void;
}

export default function ImagePicker({ disabled = false, onChange }: ImagePickerProps) {
    const $input = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null | undefined>(null);
    const [previewImage, setPreviewImage] = useState<string>();
    const [dragOver, setDragOver] = useState(false);

    const processFile = (file: File) => {
        if (file === null) return;

        if (hasAllowedType(file, allowedTypes)) {
            setSelectedImage(file);
        }
    };

    const handleTrigger = (ev: MouseEvent) => {
        ev.preventDefault();
        $input.current?.click();
    };

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.item(0) as File;
        processFile(file);
        ev.target.value = '';
    };

    const handleReset = () => {
        setSelectedImage(null);
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

        if (disabled) return;

        const file = ev.dataTransfer.files?.item(0) as File;
        processFile(file);
    };

    useEffect(() => {
        const reader: FileReader = new FileReader();
        reader.onloadend = (ev: ProgressEvent<FileReader>) => {
            if (ev.target?.result) {
                setPreviewImage(ev.target?.result.toString());
            }
        };

        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
            onChange?.(selectedImage);
        }

        return () => {
            reader.abort();
        };
    }, [selectedImage]);

    return (
        <>
            <input
                ref={$input}
                className='hidden'
                type='file'
                accept={allowedTypes}
                onChange={handleChange}
                disabled={disabled}
            />

            {selectedImage ? (
                <div
                    className={cn('w-[150px] h-[150px] relative flex justify-center items-center', {
                        'opacity-50': disabled,
                    })}
                >
                    <Button
                        isIconOnly
                        size='lg'
                        className='relative z-20'
                        onClick={handleReset}
                        isDisabled={disabled}
                    >
                        <TrashIcon />
                    </Button>
                    <div className='w-[150px] h-[150px] absolute z-10'>
                        <Image
                            className='w-[150px] h-[150px] object-center object-cover'
                            src={previewImage}
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
            ) : (
                <button
                    className={cn(
                        'w-[150px] h-[150px] flex flex-col gap-4 justify-center items-center bg-transparent border-dashed border-2 border-default-200 rounded-lg text-xs p-6 transition-all',
                        {
                            'border-default-400': dragOver,
                            'border-red-400': dragOver && disabled,
                            'opacity-50': disabled,
                        },
                    )}
                    disabled={disabled}
                    onClick={handleTrigger}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <SearchIcon size='1.5rem' />
                    Drop or Browse an Image
                </button>
            )}
        </>
    );
}

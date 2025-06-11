import { useRef, useState, useEffect } from 'react';
import { ImageIcon, TrashIcon } from 'lucide-react';

import { cn, hasAllowedType } from '@/modules/core/helpers/utils';

import { Button } from '@/modules/shadcn/ui/button';

const allowedTypes = 'image/png, image/jpeg, image/webp, image/gif';

export const ImagePicker = ({ className, disabled, onSelect }) => {
    const $input = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState();
    const [dragOver, setDragOver] = useState(false);

    const processFile = file => {
        if (file === null) return;

        if (hasAllowedType(file, allowedTypes)) {
            setSelectedImage(file);
        }
    };

    const handleTrigger = ev => {
        ev.preventDefault();
        $input.current?.click();
    };

    const handleChange = ev => {
        const file = ev.target.files?.item(0);
        processFile(file);
        ev.target.value = '';
    };

    const handleReset = () => {
        setSelectedImage(null);
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

        if (disabled) return;

        const file = ev.dataTransfer.files?.item(0);
        processFile(file);
    };

    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = ev => {
            if (ev.target?.result) {
                setPreviewImage(ev.target?.result.toString());
            }
        };

        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
            onSelect?.(selectedImage);
        }

        return () => {
            reader.abort();
        };
    }, [selectedImage, onSelect]);

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
                    className={cn(
                        'size-32 relative flex justify-center items-center rounded-2xl overflow-hidden',
                        {
                            'opacity-50': disabled,
                        },
                        className,
                    )}
                >
                    <Button
                        size='icon'
                        className='relative z-20'
                        onClick={handleReset}
                        disabled={disabled}
                    >
                        <TrashIcon />
                    </Button>

                    <div className='size-32 absolute z-10'>
                        <img
                            className='size-32 object-center object-cover'
                            src={previewImage}
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
            ) : (
                <button
                    className={cn(
                        'size-32 flex-center flex-col gap-4 p-6 bg-transparent border-2 border-dashed border-neutral-200 rounded-xl text-xs transition-all [&_svg]:size-4',
                        {
                            'border-blue-400': dragOver,
                            'border-red-400': dragOver && disabled,
                            'opacity-50': disabled,
                        },
                        className,
                    )}
                    disabled={disabled}
                    onClick={handleTrigger}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <ImageIcon />
                    Busca una imagen
                </button>
            )}
        </>
    );
};

'use client';
import { useState, useEffect } from 'react';
import { useListener } from '@/providers/bus-provider';

import TrackPlayer from './track-player';

export interface TrackItemProps {
    id: string;
    file: File;
    onRemove?: (id: string) => void;
}

export default function TrackItem({ id, file, onRemove }: TrackItemProps) {
    const [previewTrack, setPreviewTrack] = useState<string>();

    useEffect(() => {
        const reader: FileReader = new FileReader();
        reader.onloadend = (ev: ProgressEvent<FileReader>) => {
            if (ev.target?.result) {
                setPreviewTrack(ev.target?.result.toString());
            }
        };
        reader.readAsDataURL(file);

        return () => {
            reader.abort();
        };
    }, [file]);

    useListener('save', () => {
        console.log({ id, file });
    });

    if (!previewTrack) {
        return null;
    }

    return <TrackPlayer id={id} name={file.name} source={previewTrack} onRemove={onRemove} />;
}

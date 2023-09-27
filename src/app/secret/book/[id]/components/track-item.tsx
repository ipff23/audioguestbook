'use client';
import { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';

import { useListener } from '@/providers/bus-provider';
import createTrack from '@/actions/create-track';

import TrackPlayer from './track-player';
export interface TrackItemProps {
    bookId: string;
    id: string;
    file: File;
    registerd: boolean;
    onRemove?: (id: string) => void;
    onCreated?: (id: string) => void;
}

interface TrackData {
    registerd: boolean;
    bookId: string;
    nanoid: string;
    name: string;
    file: File;
}

const createTrackService = async ({ registerd, bookId, nanoid, name, file }: TrackData) => {
    if (!registerd) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('nanoid', nanoid);
        formData.append('file', file);

        await createTrack(bookId, formData);
    }
};

export default function TrackItem({
    bookId,
    id,
    file,
    registerd,
    onRemove,
    onCreated,
}: TrackItemProps) {
    const [previewTrack, setPreviewTrack] = useState<string>();

    const { run } = useRequest(createTrackService, {
        manual: true,
        onSuccess: () => {
            onCreated?.(id);
        },
        onError: error => {
            console.log({ error });
        },
    });

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

    useListener('book-editor:save', () => {
        run({
            registerd,
            bookId,
            file,
            nanoid: id,
            name: file.name,
        });
    });

    if (!previewTrack) {
        return null;
    }

    return <TrackPlayer id={id} name={file.name} source={previewTrack} onRemove={onRemove} />;
}

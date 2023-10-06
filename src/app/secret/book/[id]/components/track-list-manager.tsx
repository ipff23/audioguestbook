'use client';

import { cn } from '@/helpers/utils';
import { useListener } from '@/providers/bus-provider';
import { type EditableTrack, type Track, TrackType } from '@/types/books';

import SortableManager from './sortable-manager';
import { useEffect, useState } from 'react';

export interface TrackListProps {
    bookId: string;
    tracks: Track[];
    onChange?: (trackIds: string[]) => void;
}

export interface TrackFile {
    nanoid: string;
    name: string;
    file: File;
}

const mapTracks = (tracks: Track[]): EditableTrack[] => {
    const mappedTracks = tracks.map(track => ({
        name: track.name,
        nanoid: track.nanoid,
        url: track.url,
        type: TrackType.Stored,
    }));

    return mappedTracks;
};

const getPreviewFromFile = async (file: File) => {
    return await new Promise(resolve => {
        const reader: FileReader = new FileReader();
        reader.onloadend = (ev: ProgressEvent<FileReader>) => {
            if (ev.target?.result) {
                resolve(ev.target?.result.toString());
            }
        };
        reader.readAsDataURL(file);
    });
};

export default function TrackList({ bookId, tracks = [], onChange }: TrackListProps) {
    const mappedTracks = mapTracks(tracks);
    const [items, setItems] = useState<EditableTrack[]>(mappedTracks);

    const handleRemove = (nanoid: string) => {
        const filteredItems = items.filter(track => track.nanoid !== nanoid);
        setItems(filteredItems);
    };

    const handleDropzoneChange = async (tracksFiles: TrackFile[]) => {
        const tracksPendings = tracksFiles.map(async track => {
            const url = await getPreviewFromFile(track.file);
            return {
                url,
                name: track.name,
                nanoid: track.nanoid,
                type: TrackType.New,
                file: track.file,
            };
        });

        const tracks = (await Promise.all(tracksPendings)) as EditableTrack[];
        setItems(items => {
            return [...items].concat(tracks);
        });
    };

    useListener('drop-zone:change', handleDropzoneChange);

    useEffect(() => {
        const modifiedIds = items.map(track => track.nanoid);
        onChange?.(modifiedIds);
    }, [items]);

    return (
        <div className={cn('w-full min-h-[220px] flex flex-col gap-4 bg-transparent')}>
            <SortableManager
                bookId={bookId}
                tracks={items}
                setTracks={setItems}
                onRemove={handleRemove}
            />
        </div>
    );
}

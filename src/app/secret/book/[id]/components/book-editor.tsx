'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';

import { Button } from '@nextui-org/button';

import { type Book, type Track } from '@/types/books';

import { useEmitter } from '@/providers/bus-provider';
import removeTracks from '@/actions/remove-tracks';

import SaveIcon from '@/icons/floppy-disk-regular';
import UndoIcon from '@/icons/undo-regular';

import BookCard from './book-card';
import TrackList, { type FileItem } from './track-list';

export interface BookEditorProps {
    book: Book & { tracks: Track[] };
}

const getRemovedItems = (originalItems: Track[], modifiedItems: FileItem[]) => {
    const originalIds = originalItems.map(i => i.nanoid);
    const modifiedIds = modifiedItems.map(i => i.id);
    const removedItems = originalIds.filter(id => !modifiedIds.includes(id));
    return removedItems;
};

const removeTracksService = async (tracksIds: string[]) => {
    await removeTracks(tracksIds);
};

export default function BookEditor({ book }: BookEditorProps) {
    const router = useRouter();
    const [saving, setSaving] = useState<boolean>(false);
    const [trackItems, setTrackItems] = useState<FileItem[]>([]);

    const emitSave = useEmitter('book-editor:save');

    const { run, loading: removing } = useRequest(removeTracksService, {
        manual: true,
        onError: error => {
            console.log({ error });
        },
    });

    const handleSave = () => {
        emitSave();
        setSaving(true);

        const itemsToRemove = getRemovedItems(book.tracks, trackItems);
        run(itemsToRemove);
    };

    const handleRestore = () => {
        router.refresh();
    };

    const handleLoading = (loading: boolean) => {
        setSaving(loading);
    };

    const handleChange = (fileItems: FileItem[]) => {
        setTrackItems(fileItems);
    };

    return (
        <div className='flex flex-row-reverse gap-4 items-start'>
            <div className='flex-none h-auto flex flex-col gap-4'>
                <BookCard book={book} />

                <Button
                    color='primary'
                    endContent={<SaveIcon />}
                    onClick={handleSave}
                    isDisabled={(saving && removing) || trackItems.length === 0}
                    isLoading={saving}
                >
                    Guardar
                </Button>

                <Button
                    color='default'
                    endContent={<UndoIcon />}
                    onClick={handleRestore}
                    isDisabled={saving}
                >
                    Restaurar
                </Button>
            </div>

            <TrackList
                bookId={book.id}
                disabled={saving && removing}
                tracks={book.tracks}
                onChange={handleChange}
                onLoading={handleLoading}
            />
        </div>
    );
}

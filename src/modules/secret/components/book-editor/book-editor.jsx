/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useMap } from '@uidotdev/usehooks';

import { cn } from '@/modules/core/helpers/utils';
import { JsonDebugger } from '@/modules/core/components/json-debugger';

import { DropZone } from './drop-zone';
import { TrackListManager } from './track-list-manager';
import { useEmitter, useListener } from '@/modules/core/providers/bus-provider';
import { BookCard } from './book-card';

const getRemovedItems = (originalItems, modifiedIds) => {
    const originalIds = originalItems.map(i => i.nanoid);
    const removedItems = originalIds.filter(id => !modifiedIds.includes(id));
    return removedItems;
};

export const BookEditor = ({ className, book, tracks = [] }) => {
    const [modifiedIds, setModifiedIds] = useState([]);
    const [savingTracks, savingTracksManager] = useMap([]);

    const [saving, setSaving] = useState(false);
    const [removingBook, setRemovingBook] = useState(false);

    const emitSave = useEmitter('book-editor:save');

    const handleTrackListChane = tracksIds => {
        setModifiedIds(tracksIds);
    };

    const handleSave = () => {
        setSaving(true);
        const itemsToRemove = getRemovedItems(tracks, modifiedIds);
        // removeTracks(itemsToRemove);
    };

    const handleRestore = () => {
        // router.refresh();
    };

    const handleDeleteBook = () => {
        setRemovingBook(true);
        // removeBook(book.id);
    };

    useEffect(() => {
        if (tracks.length) {
            const modifiedTracks = tracks.map(track => track.nanoid);
            setModifiedIds(modifiedTracks);
        }
    }, [tracks]);

    useEffect(() => {
        if (savingTracks) {
            const isLoading = Array.from(savingTracks).some(([, isSaving]) => isSaving);
            setSaving(isLoading);
        }
    }, [savingTracks]);

    useListener('track-item:saving', (nanoid, isSaving) => {
        savingTracksManager.set(nanoid, isSaving);
    });

    return (
        <div
            className={cn(
                'grid grid-cols-[14rem_70ch] grid-rows-[1fr] overflow-hidden',
                '[grid-template-areas:"side_main"] w-full min-h-[calc(100svh-3.5rem)]',
                className,
            )}
        >
            <BookCard
                className='[grid-area:side] border-r'
                book={book}
                onSave={handleSave}
                onRestore={handleRestore}
                onDelete={handleDeleteBook}
            />

            <div className={cn('[grid-area:main] p-4 flex flex-col gap-4')}>
                <JsonDebugger name='book' data={book} />
                <JsonDebugger name='tracks' data={tracks} />

                <DropZone disabled={saving && removingBook} />
                <TrackListManager
                    bookId={book.id}
                    tracks={book.tracks}
                    onChange={handleTrackListChane}
                />
            </div>
        </div>
    );
};

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';

import { cn } from '@/modules/core/helpers/utils';
import { useMap } from '@/modules/core/hooks/use-map';
import { useEmitter, useListener } from '@/modules/core/providers/bus-provider';
import { JsonDebugger } from '@/modules/core/components/json-debugger';

import { removeMultipleTracksMutation } from '@/modules/secret/actions/track-actions';
import { removeBookMutation } from '@/modules/secret/actions/book-actions';

import { BookCard } from './book-card';
import { DropZone } from './drop-zone';
import { TrackListManager } from './track-list-manager';

const getRemovedItems = (originalItems, modifiedIds) => {
    const originalIds = originalItems.map(i => i.nanoid);
    const removedItems = originalIds.filter(id => !modifiedIds.includes(id));
    return removedItems;
};

export const BookEditor = ({ className, book, tracks = [] }) => {
    const [, navigate] = useLocation();
    const [modifiedIds, setModifiedIds] = useState([]);
    const [savingTracks, savingTracksManager] = useMap([]);

    const [saving, setSaving] = useState(false);

    const emitSave = useEmitter('book-editor:save');

    const removeTracks = useMutation(
        removeMultipleTracksMutation({
            onSuccess: () => {
                if (modifiedIds.length) {
                    emitSave('book-editor:save');
                } else {
                    setSaving(false);
                }
            },
        }),
    );

    const removeBook = useMutation(
        removeBookMutation({
            onSuccess: () =>
                navigate('/secret/books', {
                    replace: true,
                }),
        }),
    );

    const handleTrackListChange = tracksIds => {
        setModifiedIds(tracksIds);
    };

    const handleSave = () => {
        setSaving(true);
        const itemsToRemove = getRemovedItems(tracks, modifiedIds);

        if (itemsToRemove.length) {
            removeTracks.mutate(itemsToRemove);
        }

        if (!itemsToRemove.length && modifiedIds.length) {
            emitSave('book-editor:save');
        }
    };

    const handleRestore = () => {
        window.location.reload();
    };

    const handleDeleteBook = () => {
        removeBook.mutate(book.id);
    };

    useEffect(() => {
        if (tracks.length) {
            const modifiedTracks = tracks.map(track => track.nanoid);
            setModifiedIds(modifiedTracks);
        }
    }, [tracks]);

    useEffect(() => {
        if (savingTracks) {
            const isLoading = savingTracks.some(([, isSaving]) => isSaving);
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
                className='fixed [grid-area:side] border-r'
                book={book}
                isSaving={saving}
                isRemoving={removeBook.isPending}
                onSave={handleSave}
                onRestore={handleRestore}
                onDelete={handleDeleteBook}
            />

            <div className={cn('[grid-area:main] p-4 flex flex-col gap-4')}>
                <JsonDebugger name='book' data={book} />
                <JsonDebugger name='tracks' data={tracks} />

                <DropZone disabled={saving || removeBook.isPending} />

                <TrackListManager
                    bookId={book.id}
                    tracks={tracks}
                    onChange={handleTrackListChange}
                />
            </div>
        </div>
    );
};

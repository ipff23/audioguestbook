'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest, useMap } from 'ahooks';

import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

import { type Book, type Track } from '@/types/books';

import { useEmitter, useListener } from '@/providers/bus-provider';
import removeTracksAction from '@/actions/remove-tracks';
import removeBookAction from '@/actions/remove-book';

import SaveIcon from '@/icons/floppy-disk-regular';
import UndoIcon from '@/icons/undo-regular';
import TrashIcon from '@/icons/trash-regular';

import BookCard from './book-card';
import DropZone from './drop-zone';
import TrackList from './track-list-manager';

export interface BookEditorProps {
    book: Book & { tracks: Track[] };
    tracks: Track[];
}

const getRemovedItems = (originalItems: Track[], modifiedIds: string[]) => {
    const originalIds = originalItems.map(i => i.nanoid);
    const removedItems = originalIds.filter(id => !modifiedIds.includes(id));
    return removedItems;
};

const removeTracksService = async (tracksIds: string[]) => {
    await removeTracksAction(tracksIds);
};

const removeBookService = async (bookId: string) => {
    await removeBookAction(bookId);
};

export default function BookEditor({ book, tracks = [] }: BookEditorProps) {
    const router = useRouter();

    const [modifiedIds, setModifiedIds] = useState<string[]>([]);
    const [savingTracks, savingTracksManager] = useMap<string, boolean>();

    const [saving, setSaving] = useState(false);
    const [removingBook, setSemovingBook] = useState<boolean>(false);

    const emitSave = useEmitter('book-editor:save');

    const { run: removeTracks } = useRequest(removeTracksService, {
        manual: true,
        onSuccess: () => {
            emitSave();
        },
        onError: error => {
            console.log({ error });
        },
    });

    const { run: removeBook } = useRequest(removeBookService, {
        manual: true,
        onSuccess: () => {
            router.push('/secret');
        },
        onError: error => {
            console.log({ error });
        },
    });

    const handleTrackListChane = (tracksIds: string[]) => {
        setModifiedIds(tracksIds);
    };

    const handleSave = () => {
        setSaving(true);
        const itemsToRemove = getRemovedItems(tracks, modifiedIds);
        removeTracks(itemsToRemove);
    };

    const handleRestore = () => {
        router.refresh();
    };

    const handleDeleteBook = () => {
        setSemovingBook(true);
        removeBook(book.id);
    };

    useEffect(() => {
        const modifiedTracks = tracks.map(track => track.nanoid);
        setModifiedIds(modifiedTracks);
    }, [tracks]);

    useEffect(() => {
        const isLoading = Array.from(savingTracks).some(([, isSaving]) => isSaving);
        setSaving(isLoading);
    }, [savingTracks]);

    useListener('track-item:saving', (nanoid, isSaving) => {
        savingTracksManager.set(nanoid, isSaving);
    });

    return (
        <div className='flex flex-row-reverse gap-4 items-start'>
            <div className='flex-none h-auto flex flex-col gap-4'>
                <BookCard book={book} />

                <Button
                    color='primary'
                    endContent={<SaveIcon />}
                    onClick={handleSave}
                    isDisabled={(saving && removingBook) || modifiedIds.length === 0}
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

                <Popover placement='bottom' backdrop='blur'>
                    <PopoverTrigger>
                        <Button color='default' endContent={<TrashIcon />}>
                            Borrar
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col justify-start items-start gap-4 p-6 w-[240px]'>
                        <p className='w-full text-left'>
                            Al borrar se perderán todos los datos y no podrán ser recuperados.
                        </p>
                        <p className='w-full text-left font-semibold'>¿Deseas continuar?</p>
                        <Button
                            color='danger'
                            endContent={<TrashIcon />}
                            onClick={handleDeleteBook}
                            isLoading={removingBook}
                            isDisabled={removingBook}
                            fullWidth
                        >
                            Confirmar
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>

            <div className='flex-1 flex flex-col gap-4'>
                <DropZone disabled={saving && removingBook} />
                <TrackList bookId={book.id} tracks={book.tracks} onChange={handleTrackListChane} />
            </div>
        </div>
    );
}

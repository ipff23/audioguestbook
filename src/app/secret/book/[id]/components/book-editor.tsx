'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';

import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

import { type Book, type Track } from '@/types/books';

import { useEmitter } from '@/providers/bus-provider';
import removeTracksAction from '@/actions/remove-tracks';
import removeBookAction from '@/actions/remove-book';

import SaveIcon from '@/icons/floppy-disk-regular';
import UndoIcon from '@/icons/undo-regular';

import BookCard from './book-card';
import TrackList, { type FileItem } from './track-list';
import TrashIcon from '@/icons/trash-regular';

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
    await removeTracksAction(tracksIds);
};

const removeBookService = async (bookId: string) => {
    await removeBookAction(bookId);
};

export default function BookEditor({ book }: BookEditorProps) {
    const router = useRouter();
    const [saving, setSaving] = useState<boolean>(false);
    const [removingBook, setSemovingBook] = useState<boolean>(false);
    const [trackItems, setTrackItems] = useState<FileItem[]>([]);

    const emitSave = useEmitter('book-editor:save');

    const { run: removeTracks, loading: removingTracks } = useRequest(removeTracksService, {
        manual: true,
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

    const handleSave = () => {
        emitSave();
        setSaving(true);

        const itemsToRemove = getRemovedItems(book.tracks, trackItems);
        removeTracks(itemsToRemove);
    };

    const handleRestore = () => {
        router.refresh();
    };

    const handleDelete = () => {
        setSemovingBook(true);
        removeBook(book.id);
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
                    isDisabled={(saving && removingTracks) || trackItems.length === 0}
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
                            onClick={handleDelete}
                            isLoading={removingBook}
                            isDisabled={removingBook}
                            fullWidth
                        >
                            Confirmar
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>

            <TrackList
                bookId={book.id}
                disabled={saving && removingTracks}
                tracks={book.tracks}
                onChange={handleChange}
                onLoading={handleLoading}
            />
        </div>
    );
}

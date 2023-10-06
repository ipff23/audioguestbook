'use client';
import { type Dispatch, type SetStateAction } from 'react';
import {
    type DragEndEvent,
    type UniqueIdentifier,
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { type EditableTrack } from '@/types/books';

import SortableItem from './sortable-item';

export interface SortableTrack extends EditableTrack {
    id: UniqueIdentifier;
}

export interface SortableManagerProps {
    bookId: string;
    tracks?: EditableTrack[];
    setTracks?: Dispatch<SetStateAction<EditableTrack[]>>;
    onRemove?: (nanoid: string) => void;
}

const mapSortableTracks = (tracks: EditableTrack[]): SortableTrack[] => {
    return tracks.map(track => ({
        ...track,
        id: track.nanoid,
    }));
};

export default function SortableManager({
    bookId,
    tracks = [],
    setTracks,
    onRemove,
}: SortableManagerProps) {
    const itemsWithIdentifier = mapSortableTracks(tracks);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTracks?.(items => {
                const oldIndex = items.findIndex(track => track.nanoid === active.id);
                const newIndex = items.findIndex(track => track.nanoid === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={itemsWithIdentifier} strategy={verticalListSortingStrategy}>
                {tracks.map((track: EditableTrack, index) => (
                    <SortableItem
                        bookId={bookId}
                        key={track.nanoid}
                        index={index}
                        track={track}
                        onRemove={onRemove}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
}

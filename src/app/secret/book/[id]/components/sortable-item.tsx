'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { type EditableTrack } from '@/types/books';

import TrackItemManager from './track-item-manager';

export interface SortableItemProps {
    bookId: string;
    index: number;
    track: EditableTrack;
    onRemove?: (nanoid: string) => void;
}

export default function SortableItem({ bookId, index, track, onRemove }: SortableItemProps) {
    const {
        // ...
        isDragging,
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        setActivatorNodeRef,
    } = useSortable({
        id: track.nanoid,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <TrackItemManager
                bookId={bookId}
                index={index}
                track={track}
                isDragging={isDragging}
                listeners={listeners}
                setActivatorNodeRef={setActivatorNodeRef}
                onRemove={onRemove}
            />
        </div>
    );
}

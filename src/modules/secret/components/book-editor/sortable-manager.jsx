import {
    closestCenter,
    DndContext,
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

import { SortableItem } from './sortable-item';

const mapSortableTracks = tracks => {
    return tracks.map(track => ({
        ...track,
        id: track.nanoid,
    }));
};

export const SrotableManager = ({ bookId, tracks = [], setTracks, onRemove }) => {
    const itemsWithIdentifier = mapSortableTracks(tracks);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = event => {
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
                {tracks.map((track, index) => (
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
};

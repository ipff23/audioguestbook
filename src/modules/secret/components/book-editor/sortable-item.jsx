import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrackItemManager } from './track-item-manager';

export const SortableItem = ({ bookId, index, track, onRemove }) => {
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
};

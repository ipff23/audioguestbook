import { useEffect, useState } from 'react';
import { useEvents } from '@/modules/core/providers/bus-provider';
import { TrackItemView } from './track-item-view';

export const TrackItemManager = ({
    bookId,
    index,
    track,
    isDragging,
    listeners,
    setActivatorNodeRef,
    onRemove,
}) => {
    const [name, setName] = useState(track.name ?? '');
    const [duration, setDuration] = useState(0);

    const { emit, on, off } = useEvents();

    const isSaving = false;

    const handleSave = () => {
        // eslint-disable-next-line no-unused-vars
        const trackData = {
            bookId,
            index,
            name,
            duration,
            track,
        };
        // saveTrack(trackData);
        emit('track-item:saving', track.nanoid, true);
    };

    const handleNameChange = value => {
        setName(value);
    };

    const handleDurationChange = value => {
        setDuration(value);
    };

    useEffect(() => {
        on('book-editor:save', handleSave);
        return () => {
            off('book-editor:save', handleSave);
        };
    }, [index, name]);

    return (
        <TrackItemView
            index={index}
            name={name}
            track={track}
            source={track.url}
            isSaving={isSaving}
            isDragging={isDragging}
            setActivatorNodeRef={setActivatorNodeRef}
            listeners={listeners}
            onNameChange={handleNameChange}
            onDurationChange={handleDurationChange}
            onRemove={onRemove}
        />
    );
};

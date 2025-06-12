import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useEvents } from '@/modules/core/providers/bus-provider';

import { saveTrackMutation } from '../../actions/track-actions';
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

    const { emit, on } = useEvents();

    const saveTrack = useMutation(
        saveTrackMutation({
            onSuccess: () => {
                emit('track-item:saving', { nanoid: track.nanoid, isSaving: false });
            },
            onError: error => {
                emit('track-item:saving', { nanoid: track.nanoid, isSaving: false });
                console.log(error);
            },
        }),
    );

    const handleNameChange = value => {
        setName(value);
    };

    const handleDurationChange = value => {
        setDuration(value);
    };

    useEffect(() => {
        const handleSave = () => {
            const trackData = {
                bookId,
                index,
                name,
                duration,
                track,
            };
            saveTrack.mutate(trackData);
        };

        const off = on('book-editor:save', handleSave);
        return () => off();
    }, [index, name, track]);

    return (
        <TrackItemView
            index={index}
            name={name}
            track={track}
            source={track.url}
            isSaving={saveTrack.isPending}
            isDragging={isDragging}
            setActivatorNodeRef={setActivatorNodeRef}
            listeners={listeners}
            onNameChange={handleNameChange}
            onDurationChange={handleDurationChange}
            onRemove={onRemove}
        />
    );
};

'use client';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { kebabCase } from 'lodash';
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { TrackType, type EditableTrack } from '@/types/books';
import { useEvents } from '@/providers/bus-provider';
import { downloadLink } from '@/helpers/utils';

import createTrackAction from '@/actions/create-track';
import updateTrackAction from '@/actions/update-track';

import TrackItemView from './track-item-view';

export interface TrackItemManagerProps {
    bookId: string;
    index: number;
    track: EditableTrack;
    isDragging?: boolean;
    listeners?: SyntheticListenerMap;
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    onDurationChange?: (duration: number) => void;
    onRemove?: (id: string) => void;
}

interface TrackNewData {
    bookId: string;
    index: number;
    nanoid: string;
    name: string;
    duration: number;
    file: File;
}

interface TrackStoredData {
    nanoid: string;
    index: number;
    name: string;
}

interface TrackData {
    bookId: string;
    index: number;
    name: string;
    duration: number;
    track: EditableTrack;
}

const createTrackService = async ({
    bookId,
    index,
    nanoid,
    name,
    duration,
    file,
}: TrackNewData) => {
    const formData = new FormData();
    formData.append('bookId', bookId);
    formData.append('index', `${index}`);
    formData.append('nanoid', nanoid);
    formData.append('name', name);
    formData.append('duration', `${duration}`);
    formData.append('file', file);

    await createTrackAction(formData);
};

const updateTrackService = async ({ nanoid, index, name }: TrackStoredData) => {
    const formData = new FormData();
    formData.append('nanoid', nanoid);
    formData.append('index', `${index}`);
    formData.append('name', name);

    await updateTrackAction(formData);
};

const saveTrackService = async ({ bookId, index, name, duration, track }: TrackData) => {
    if (track.type === TrackType.New) {
        return await createTrackService({
            bookId,
            index,
            name,
            duration,
            nanoid: track.nanoid,
            file: track.file!,
        });
    }
    if (track.type === TrackType.Stored) {
        return await updateTrackService({
            nanoid: track.nanoid,
            index,
            name,
        });
    }

    return null;
};

export default function TrackItemManager({
    bookId,
    index,
    track,
    isDragging,
    listeners,
    setActivatorNodeRef,
    onRemove,
}: TrackItemManagerProps) {
    const [name, setName] = useState<string>(track.name ?? '');
    const [duration, setDuration] = useState<number>(0);

    const { emit, on, off } = useEvents();

    const { run: saveTrack, loading: isSaving } = useRequest(saveTrackService, {
        manual: true,
        onSuccess: () => {
            emit('track-item:saving', track.nanoid, false);
        },
        onError: error => {
            emit('track-item:saving', track.nanoid, false);
            console.log({ error });
        },
    });

    const handleSave = () => {
        const trackData = {
            bookId,
            index,
            name,
            duration,
            track,
        };
        saveTrack(trackData);
        emit('track-item:saving', track.nanoid, true);
    };

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const handleDurationChange = (value: number) => {
        setDuration(value);
    };

    const handleDownload = () => {
        const filename = `${kebabCase(name)}.mp3`;
        downloadLink(track.url, filename);
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
            onDownload={handleDownload}
        />
    );
}

import { useState } from 'react';

import { cn } from '@/modules/core/helpers/utils';
import { useListener } from '@/modules/core/providers/bus-provider';

import { SrotableManager } from './sortable-manager';

const mapTracks = tracks => {
    const mappedTracks = tracks.map(track => ({
        name: track.name,
        nanoid: track.nanoid,
        url: track.url,
        type: 'stored',
    }));

    return mappedTracks;
};

const getPreviewFromFile = async file => {
    return await new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = ev => {
            if (ev.target?.result) {
                resolve(ev.target?.result.toString());
            }
        };
        reader.readAsDataURL(file);
    });
};

export const TrackListManager = ({ className, bookId, tracks = [], onChange }) => {
    const mappedTracks = mapTracks(tracks);
    const [items, setItems] = useState(mappedTracks);

    const handleRemove = nanoid => {
        const filteredItems = items.filter(track => track.nanoid !== nanoid);
        setItems(filteredItems);
        onChange?.(filteredItems);
    };

    const handleDropzoneChange = async tracksFiles => {
        const tracksPendings = tracksFiles.map(async track => {
            const url = await getPreviewFromFile(track.file);
            return {
                url,
                name: track.name,
                nanoid: track.nanoid,
                type: 'new',
                file: track.file,
            };
        });

        const tracks = await Promise.all(tracksPendings);

        setItems(items => {
            return [...items].concat(tracks);
        });

        onChange?.([...items].concat(tracks));
    };

    useListener('drop-zone:change', handleDropzoneChange);

    return (
        <div className={cn('w-full flex flex-col gap-4', className)}>
            <SrotableManager
                bookId={bookId}
                tracks={items}
                setTracks={setItems}
                onRemove={handleRemove}
            />
        </div>
    );
};

import { TrackItemManager } from './track-item-manager';

export const SortableItem = ({ isLoading }) => {
    return (
        <div>
            <TrackItemManager isLoading={isLoading} />
        </div>
    );
};

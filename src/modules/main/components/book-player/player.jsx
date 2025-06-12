import { useQueryState } from 'nuqs';
import { cn } from '@/modules/core/helpers/utils';
import { parseAsShorthandBoolean } from '@/modules/core/helpers/nuqs';
import { ToggleIcon } from '@/modules/shadcn/ui/toggle-icon';
import { ListMusic, X } from 'lucide-react';

export const Player = () => {
    const [playlist, togglePlaylist] = useQueryState('playlist', parseAsShorthandBoolean);

    return (
        <div
            className={cn(
                'relative z-1 w-full sm:w-[400px] h-[100svh] sm:h-[600px] sm:rounded-xl transition-[border-radius,margin]',
                'text-foreground bg-gray-100/60 dark:bg-gray-700/50 backdrop-blur-lg backdrop-saturate-150',
                {
                    'md:rounded-r-none md:mr-[400px]': playlist,
                },
            )}
        >
            <ToggleIcon
                className={'absolute top-4 right-4'}
                variant='ghost'
                pressed={playlist}
                onPressedChange={togglePlaylist}
                icons={{
                    on: <X />,
                    off: <ListMusic />,
                }}
            />
        </div>
    );
};

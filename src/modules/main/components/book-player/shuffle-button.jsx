import { cn } from '@/modules/core/helpers/utils';
import { Shuffle } from '@/modules/core/components/icons';
import { BadgeIndicator } from '@/modules/shadcn/ui/badge-indicator';
import { Button } from '@/modules/shadcn/ui/button';

export const ShuffleButton = ({ shuffling, onChange }) => {
    const handleClick = () => {
        const toggledShuffling = !shuffling;
        onChange?.(toggledShuffling);
    };

    return (
        <BadgeIndicator
            className={cn('bg-green-500', 'bg-transparent')}
            color='green'
            visible={shuffling}
        >
            <Button
                className="size-12 bg-transparent hover:bg-foreground/10 text-foreground/80 rounded-full [&_svg:not([class*='size-'])]:size-5"
                size='icon'
                onClick={handleClick}
            >
                <Shuffle />
            </Button>
        </BadgeIndicator>
    );
};

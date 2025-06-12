import { cn } from '@/modules/core/helpers/utils';
import { Repeat, RepeatOnce } from '@/modules/core/components/icons';
import { BadgeIndicator } from '@/modules/shadcn/ui/badge-indicator';
import { Button } from '@/modules/shadcn/ui/button';

const RepeatState = {
    RepeatAll: 'RepeatAll',
    RepeatOne: 'RepeatOne',
    NoRepeat: 'NoRepeat',
};

export const RepeatButton = ({ state = 'NoRepeat', onChange }) => {
    const handleClick = () => {
        switch (state) {
            case RepeatState.NoRepeat:
                onChange?.(RepeatState.RepeatAll);
                break;
            case RepeatState.RepeatAll:
                onChange?.(RepeatState.RepeatOne);
                break;
            case RepeatState.RepeatOne:
                onChange?.(RepeatState.NoRepeat);
                break;
        }
    };

    return (
        <BadgeIndicator
            className={cn('bg-green-500', 'bg-transparent')}
            color='green'
            visible={state !== RepeatState.NoRepeat}
        >
            <Button
                className="size-12 bg-transparent hover:bg-foreground/10 text-foreground/80 rounded-full [&_svg:not([class*='size-'])]:size-5"
                size='icon'
                onClick={handleClick}
            >
                {state === RepeatState.NoRepeat && <Repeat />}
                {state === RepeatState.RepeatAll && <Repeat />}
                {state === RepeatState.RepeatOne && <RepeatOnce />}
            </Button>
        </BadgeIndicator>
    );
};

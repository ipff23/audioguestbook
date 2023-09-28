import { Button } from '@nextui-org/button';
import { Badge } from '@nextui-org/badge';

import RepeatOnceIcon from '@/icons/repeat-once-fill';
import RepeatIcon from '@/icons/repeat-fill';

export enum RepeatState {
    RepeatAll,
    RepeatOne,
    NoRepeat,
}

export interface RepeatButtonProps {
    state?: RepeatState;
    onChange?: (newState: RepeatState) => void;
}

export default function RepeatButton({
    state = RepeatState.NoRepeat,
    onChange,
}: RepeatButtonProps) {
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
        <Badge
            content=''
            color='success'
            shape='circle'
            placement='top-right'
            isInvisible={state === RepeatState.NoRepeat}
        >
            <Button
                className='data-[hover]:bg-foreground/10'
                radius='full'
                variant='light'
                onClick={handleClick}
                isIconOnly
            >
                {state === RepeatState.NoRepeat && (
                    <RepeatIcon className='text-foreground/80 text-2xl' />
                )}
                {state === RepeatState.RepeatAll && (
                    <RepeatIcon className='text-foreground/80 text-2xl' />
                )}
                {state === RepeatState.RepeatOne && (
                    <RepeatOnceIcon className='text-foreground/80 text-2xl' />
                )}
            </Button>
        </Badge>
    );
}

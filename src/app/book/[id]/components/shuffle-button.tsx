import { Button } from '@nextui-org/button';
import { Badge } from '@nextui-org/badge';

import ShuffleFill from '@/icons/shuffle-fill';

export interface ShuffleButtonProps {
    shuffling?: boolean;
    onChange?: (shuffling: boolean) => void;
}

export default function ShuffleButton({ shuffling, onChange }: ShuffleButtonProps) {
    const handleClick = () => {
        const toggledShuffling = !shuffling;
        onChange?.(toggledShuffling);
    };

    return (
        <Badge
            content=''
            color='success'
            shape='circle'
            placement='top-right'
            isInvisible={!shuffling}
        >
            <Button
                className='data-[hover]:bg-foreground/10'
                radius='full'
                variant='light'
                onClick={handleClick}
                isIconOnly
            >
                <ShuffleFill className='text-foreground/80 text-2xl' />
            </Button>
        </Badge>
    );
}

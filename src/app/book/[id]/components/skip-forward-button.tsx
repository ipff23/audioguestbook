import { Button } from '@nextui-org/button';

import SkipForwardIcon from '@/icons/skip-forward-fill';

export interface SkipForwardButtonProps {
    onClick?: () => void;
}

export default function SkipForwardButton({ onClick }: SkipForwardButtonProps) {
    return (
        <Button
            className='w-[52px] h-[52px] data-[hover]:bg-foreground/10'
            radius='full'
            variant='light'
            onClick={onClick}
            isIconOnly
        >
            <SkipForwardIcon className='text-2xl' />
        </Button>
    );
}

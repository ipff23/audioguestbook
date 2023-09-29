import { Button } from '@nextui-org/button';

import SkipBackIcon from '@/icons/skip-back-fill';

export interface SkipBackButtonProps {
    onClick?: () => void;
}

export default function SkipBackButton({ onClick }: SkipBackButtonProps) {
    return (
        <Button
            className='w-[52px] h-[52px] data-[hover]:bg-foreground/10'
            radius='full'
            variant='light'
            onClick={onClick}
            isIconOnly
        >
            <SkipBackIcon className='text-2xl' />
        </Button>
    );
}

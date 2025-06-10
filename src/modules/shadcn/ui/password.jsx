import { useState } from 'react';
import { cn } from '@/modules/core/helpers/utils';
import { Input } from './input';
import { ToggleIcon } from './toggle-icon';
import { Eye, EyeClosed } from 'lucide-react';

export const Password = ({ className, revealed = false, onReveal, ...props }) => {
    const [$revealed, setRevealed] = useState(revealed);

    const toggleReveal = () => {
        setRevealed(prev => !prev);
        onReveal?.(!$revealed);
    };

    return (
        <div className={cn('relative flex')}>
            <Input
                className={cn('pr-8', className)}
                type={$revealed ? 'text' : 'password'}
                {...props}
            />
            <ToggleIcon
                className='absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent data-[state=on]:bg-transparent'
                variant='ghost'
                pressed={!$revealed}
                onPressedChange={toggleReveal}
                icons={{
                    off: <Eye />,
                    on: <EyeClosed />,
                }}
            />
        </div>
    );
};

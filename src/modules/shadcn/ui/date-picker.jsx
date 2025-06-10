import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';

import { Button } from '@/modules/shadcn/ui/button';
import { Calendar } from '@/modules/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shadcn/ui/popover';

export const DatePicker = ({ className, selected, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    className={cn('w-48 justify-between font-normal', className)}
                >
                    {selected ? format(selected, 'PPP') : 'Selecciona una fecha'}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>{' '}
            <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                <Calendar
                    mode='single'
                    selected={selected}
                    captionLayout='dropdown'
                    onSelect={date => {
                        onSelect?.(date);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};

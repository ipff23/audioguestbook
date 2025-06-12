import { useState } from 'react';
import { format } from 'date-fns';
import { ExternalLink, History, Loader2, Save, Trash, Trash2 } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { keyCase } from '@/modules/core/helpers/strings';
import { parseTimestamp } from '@/modules/core/helpers/dates';

import { Button } from '@/modules/shadcn/ui/button';
import { Separator } from '@/modules/shadcn/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shadcn/ui/popover';

export const BookCard = ({
    className,
    book,
    isSaving,
    isRemoving,
    onSave,
    onRestore,
    onDelete,
}) => {
    const [needsToConfirmDelete, setNeedsToConfirmDelete] = useState(false);

    return (
        <div className={cn('flex flex-col gap-4 p-4 items-center', className)}>
            <img
                src={book.cover}
                alt={book.title}
                className='size-48 object-cover rounded-2xl shadow'
            />

            <div className='flex flex-col items-center'>
                <h1 className='font-semibold text-center'>{book.name}</h1>
                <p className='text-sm'>{format(parseTimestamp(book.date), 'PPP')}</p>
                <p className='text-sm mt-2'>
                    <a
                        className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 bg-blue-200 font-mono font-semibold text-sm text-blue-700 rounded-md',
                            '[&_svg]:size-4 [&_svg]:-mt-0.5',
                            'hover:bg-blue-300',
                            'dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700',
                        )}
                        href={`/book/${book.id}/${keyCase(book.name)}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {book.id} <ExternalLink />
                    </a>
                </p>
            </div>

            <Separator />

            <Button className='w-full' disabled={isSaving} onClick={onSave}>
                {isSaving ? <Loader2 className='animate-spin' /> : <Save />}
                <span className='w-18'>Guardar</span>
            </Button>

            <Button variant='secondary' disabled={isSaving} className='w-full' onClick={onRestore}>
                <History />
                <span className='w-18'>Restaurar</span>
            </Button>

            {(needsToConfirmDelete || isRemoving) && (
                <div className='fixed inset-0 z-10 bg-black/10 backdrop-blur-xs animate-in fade-in-0 duration-100 ease-in' />
            )}

            <Popover
                open={needsToConfirmDelete || isRemoving}
                onOpenChange={setNeedsToConfirmDelete}
            >
                <PopoverTrigger asChild>
                    <Button variant='secondary' disabled={isSaving} className='w-full'>
                        {isRemoving ? <Loader2 className='animate-spin' /> : <Trash />}
                        <span className='w-18'>Eliminar</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-48 -mt-10 flex flex-col gap-2 text-sm'>
                    <p>Al borrar se perderán todos los datos y no podrán ser recuperados.</p>
                    <p className='font-bold'>¿Deseas continuar?</p>
                    <Button variant='destructive' disabled={isSaving} onClick={onDelete}>
                        {isRemoving ? <Loader2 className='animate-spin' /> : <Trash2 />}
                        <span className='w-18'>Confirmar</span>
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

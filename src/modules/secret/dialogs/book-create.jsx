import { parseAsShorthandBoolean } from '@/modules/core/helpers/nuqs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/modules/shadcn/ui/dialog';
import { useQueryState } from 'nuqs';

export const useBookCreateDialogController = () => {
    return useQueryState('create', parseAsShorthandBoolean);
};

export const BookCreate = () => {
    const [open, setOpen] = useBookCreateDialogController();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[70ch]'>
                <DialogHeader>
                    <DialogTitle>Crear Book</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 h-32 bg-neutral-500/10 rounded-md'></div>
            </DialogContent>
        </Dialog>
    );
};

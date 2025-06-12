import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQueryState } from 'nuqs';
import { Loader2, Save } from 'lucide-react';

import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/modules/core/helpers/utils';
import { parseAsShorthandBoolean } from '@/modules/core/helpers/nuqs';
import { createBookMutation } from '@/modules/secret/actions/book-actions';

import { Button } from '@/modules/shadcn/ui/button';
import { Label } from '@/modules/shadcn/ui/label';
import { Input } from '@/modules/shadcn/ui/input';
import { DatePicker } from '@/modules/shadcn/ui/date-picker';
import { ImagePicker } from '@/modules/shadcn/ui/image-picker';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/modules/shadcn/ui/dialog';

export const useBookCreateDialogController = () => {
    return useQueryState('create', parseAsShorthandBoolean);
};

export const BookCreate = () => {
    const [, setLocation] = useLocation();
    const [open, setOpen] = useBookCreateDialogController();
    const [cover, setCover] = useState(null);

    const createBook = useMutation(
        createBookMutation({
            onSuccess: data => {
                setOpen(false);
                setLocation(`/secret/books/${data.id}`);
            },
        }),
    );

    const eventSchema = z.object({
        eventName: z.string().min(1),
        eventDate: z.date(),
        hasCover: z.boolean(),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(eventSchema),
    });

    const onSubmit = data => {
        createBook.mutate({
            cover,
            name: data.eventName,
            date: data.eventDate,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[60ch]'>
                <DialogHeader>
                    <DialogTitle>Crear Book</DialogTitle>
                </DialogHeader>

                <form
                    id='create-book-form'
                    className='flex gap-8'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <Controller
                            name='hasCover'
                            control={control}
                            render={({ field }) => (
                                <ImagePicker
                                    onSelect={file => {
                                        field.onChange(!!file);
                                        setCover(file);
                                    }}
                                    className={cn({
                                        'ring-2 ring-offset-4 ring-red-500 dark:ring-offset-neutral-800':
                                            errors.hasCover,
                                    })}
                                />
                            )}
                        />
                    </div>

                    <div className='w-full space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='eventName'>Nombre del evento</Label>
                            <Input
                                className={cn({
                                    'ring-2 ring-red-500': errors.eventName,
                                })}
                                {...register('eventName')}
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='eventDate'>Fecha del evento</Label>

                            <Controller
                                name='eventDate'
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        className={cn({
                                            'ring-2 ring-red-500': errors.eventDate,
                                        })}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button type='button' variant='secondary' onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>

                    <Button type='submit' form='create-book-form' disabled={createBook.isPending}>
                        {createBook.isPending ? <Loader2 className='animate-spin' /> : <Save />}
                        Crear
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

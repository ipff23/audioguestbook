import { useQueryState } from 'nuqs';
import { Loader2, Save } from 'lucide-react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn, nanoid } from '@/modules/core/helpers/utils';
import { parseAsShorthandBoolean } from '@/modules/core/helpers/nuqs';

import { createUserMutation } from '@/modules/secret/actions/user-actions';

import { Button } from '@/modules/shadcn/ui/button';
import { Label } from '@/modules/shadcn/ui/label';
import { Input } from '@/modules/shadcn/ui/input';
import { Password } from '@/modules/shadcn/ui/password';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/modules/shadcn/ui/dialog';

export const useUserCreateDialogController = () => {
    return useQueryState('create', parseAsShorthandBoolean);
};

export const UserCreate = () => {
    const [open, setOpen] = useUserCreateDialogController();
    const queryClient = useQueryClient();

    const userSchema = z.object({
        name: z.string().min(1),
        email: z.email(),
        tempPassword: z.string().min(8),
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
    });

    const createUser = useMutation(
        createUserMutation({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
                setOpen(false);
                reset();
            },
        }),
    );

    const onSubmit = data => {
        createUser.mutate(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[60ch]'>
                <DialogHeader>
                    <DialogTitle>Añadir usuario</DialogTitle>
                </DialogHeader>

                <form
                    id='create-book-form'
                    className='flex gap-8'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='w-full space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Nombre del usuario</Label>
                            <Input
                                className={cn({
                                    'ring-2 ring-red-500': errors.name,
                                })}
                                {...register('name')}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                className={cn({
                                    'ring-2 ring-red-500': errors.email,
                                })}
                                {...register('email')}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='tempPassword'>Contraseña temporal</Label>
                            <Password
                                className={cn({
                                    'ring-2 ring-red-500': errors.tempPassword,
                                })}
                                defaultValue={nanoid()}
                                {...register('tempPassword')}
                            />
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button type='button' variant='secondary' onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>

                    <Button type='submit' form='create-book-form' disabled={createUser.isPending}>
                        {createUser.isPending ? <Loader2 className='animate-spin' /> : <Save />}
                        Crear
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

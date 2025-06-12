import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';

import { AlertCircleIcon, Loader2 } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { toAcronym } from '@/modules/core/helpers/strings';
import { loginWithEmail } from '@/modules/core/services/firebase';
import { readUserMuation, changePasswordMuation } from '@/modules/secret/actions/user-actions';

import { Logo } from '@/modules/main/components/logo';

import { Password } from '@/modules/shadcn/ui/password';
import { Button } from '@/modules/shadcn/ui/button';
import { Label } from '@/modules/shadcn/ui/label';
import { Input } from '@/modules/shadcn/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shadcn/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/modules/shadcn/ui/alert';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/modules/shadcn/ui/card';

const loginMutation = ({ onSuccess }) => {
    return {
        onSuccess,
        mutationFn: async credentials => {
            const user = await loginWithEmail(credentials);
            return user;
        },
    };
};

const LoginScreen = ({ onLogin }) => {
    const [, navigate] = useLocation();

    const readUser = useMutation(
        readUserMuation({
            onSuccess: user => {
                if (user?.firstTime) onLogin?.(user);
                else navigate('/secret');
            },
        }),
    );

    const loginAction = useMutation(
        loginMutation({
            onSuccess: user => {
                readUser.mutate(user);
            },
        }),
    );

    const loading = loginAction.isPending || readUser.isPending;

    const loginSchema = z.object({
        email: z.email(),
        password: z.string().min(4),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    return (
        <div className='min-h-screen flex items-center justify-center bg-muted px-4'>
            <Card className='w-full max-w-sm'>
                <CardHeader className='space-y-2'>
                    <CardTitle>
                        <Logo className='text-2xl' />
                    </CardTitle>

                    <CardDescription>
                        Ingresa tu correo electrónico y contraseña para iniciar sesión en el
                        dashboard.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className='space-y-4' onSubmit={handleSubmit(loginAction.mutate)}>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                className={cn({
                                    'ring-2 ring-red-500': errors.email,
                                })}
                                type='email'
                                placeholder='m@example.com'
                                {...register('email')}
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='password'>Contraseña</Label>
                            <Password
                                className={cn({
                                    'ring-2 ring-red-500': errors.password,
                                })}
                                {...register('password')}
                            />
                        </div>

                        {loginAction.isError && (
                            <Alert variant='destructive'>
                                <AlertCircleIcon />
                                <AlertTitle>No se puede iniciar sesión</AlertTitle>
                                <AlertDescription>
                                    <p>Por favor revisa tus credenciales e intenta de nuevo.</p>
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button type='submit' size='lg' className='w-full' disabled={loading}>
                            {loading && <Loader2 className='animate-spin' />}
                            Iniciar sesión
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

const FirstTime = ({ user }) => {
    const [, navigate] = useLocation();

    const changePassword = useMutation(
        changePasswordMuation({
            onSuccess: () => {
                navigate('/secret');
            },
        }),
    );

    const passwordSchema = z
        .object({
            password: z.string().min(8),
            confirmPassword: z.string(),
        })
        .refine(data => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: 'Passwords do not match',
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = data => {
        changePassword.mutate({
            uid: user.uid,
            email: user.email,
            password: data.password,
        });
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-muted px-4'>
            <Card className='w-full max-w-sm'>
                <CardHeader className='space-y-2'>
                    <CardTitle>
                        <Avatar className='mb-4 size-16'>
                            <AvatarImage src={`https://unavatar.io/${user.email}`} />
                            <AvatarFallback>{toAcronym(user.name)}</AvatarFallback>
                        </Avatar>
                        <h1 className='text-xl'>Hey there!, {user.name}.</h1>
                    </CardTitle>

                    <CardDescription>
                        Es tu primera vez en el dashboard. Por favor, ingresa una nueva contraseña
                        antes de continuar.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-2'>
                            <Label htmlFor='password'>Contraseña</Label>
                            <Password
                                className={cn({
                                    'ring-2 ring-red-500': errors.password,
                                })}
                                placeholder='Al menos 8 caracteres'
                                {...register('password')}
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='confirmPassword'>Repetir contraseña</Label>
                            <Password
                                className={cn({
                                    'ring-2 ring-red-500': errors.confirmPassword,
                                })}
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <span className='text-sm text-red-500'>
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>

                        <Button
                            type='submit'
                            size='lg'
                            className='w-full'
                            disabled={changePassword.isPending}
                        >
                            {changePassword.isPending && <Loader2 className='animate-spin' />}
                            Guardar y continuar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export const Login = () => {
    const [user, setUser] = useState(null);

    if (user?.firstTime) {
        return <FirstTime user={user} />;
    }

    return <LoginScreen onLogin={setUser} />;
};

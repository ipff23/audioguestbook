import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { toAcronym } from '@/modules/core/helpers/strings';
import { useSettings } from '@/modules/core/hooks/use-settings';

import { readAllUsersQuery } from '@/modules/secret/actions/user-actions';

import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';

import { Badge } from '@/modules/shadcn/ui/badge';
import { Button } from '@/modules/shadcn/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shadcn/ui/avatar';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';
import { Password } from '@/modules/shadcn/ui/password';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/modules/shadcn/ui/table';

import { UserCreate, useUserCreateDialogController } from '@/modules/secret/dialogs/user-create';

export const UsersAll = () => {
    const [debug] = useSettings('settings:debug', false);
    const { data: users = [], isLoading } = useQuery(readAllUsersQuery());

    const [, setOpen] = useUserCreateDialogController();

    return (
        <WithAuth>
            <Layout title='Todos los Usuarios'>
                <header className='flex items-center justify-between p-4'>
                    <h1 className='font-bold uppercase'>Todos los Usuarios</h1>
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => setOpen(true)}>
                            <Plus />
                            Añadir Usuario
                        </Button>
                    </div>
                </header>

                <UserCreate />

                {isLoading && <Skeleton className='h-48 w-full' />}

                <div className='p-4 max-w-6xl mx-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-16'></TableHead>
                                {debug && <TableHead className='w-24'>UID</TableHead>}
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead></TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.uid}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://unavatar.io/${user.email}`}
                                            />
                                            <AvatarFallback>{toAcronym(user.name)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>

                                    {debug && (
                                        <TableHead>
                                            <Badge>{user.uid}</Badge>
                                        </TableHead>
                                    )}

                                    <TableCell className='font-medium'>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>

                                    <TableCell>
                                        {user.tempPassword && (
                                            <Password value={user.tempPassword} readOnly />
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant='secondary'
                                            className={cn({
                                                'bg-blue-500 text-white dark:bg-blue-600':
                                                    !user.firstTime,
                                            })}
                                        >
                                            {user.firstTime ? 'Pendiente' : 'Activo'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Layout>
        </WithAuth>
    );
};

import { useLocation } from 'wouter';
import { ChartArea, LibraryBig, LogOut, SquarePlus, Users } from 'lucide-react';

import { logout } from '@/modules/core/services/firebase';
import { toAcronym } from '@/modules/core/helpers/strings';
import { useAuth } from '@/modules/secret/hooks/use-auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shadcn/ui/avatar';
import { Button } from '@/modules/shadcn/ui/button';
import { Logo } from '@/modules/main/components/logo';

import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/modules/shadcn/ui/sidebar';

export const Sidebar = () => {
    const [location] = useLocation();
    const { user } = useAuth();

    return (
        <ShadcnSidebar>
            <SidebarHeader>
                <Logo className=' h-10 flex items-center ml-2' />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>BOOKS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.includes('/secret/books')}
                                    asChild
                                >
                                    <a href='/secret/books'>
                                        <LibraryBig />
                                        <span>Todos los Books</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href='/secret/books?create'>
                                        <SquarePlus />
                                        <span>Crear Book</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>ADMIN</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={location.includes('/secret/users')}
                                    asChild
                                >
                                    <a href='/secret/users'>
                                        <Users />
                                        <span>Usuarios</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href='/umami'>
                                        <ChartArea />
                                        <span>Estadídticas</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {user && (
                <SidebarFooter>
                    <div className='flex items-center justify-between gap-2 p-2'>
                        <Avatar>
                            <AvatarImage src={`https://unavatar.io/${user.email}`} />
                            <AvatarFallback>{toAcronym(user.name)}</AvatarFallback>
                        </Avatar>

                        <div className='flex flex-col items-start justify-between'>
                            <span className='text-sm font-semibold'>{user.name}</span>
                            <span className='text-xs text-muted-foreground'>{user.email}</span>
                        </div>

                        <Button variant='ghost' size='icon' className='ml-auto' onClick={logout}>
                            <LogOut />
                        </Button>
                    </div>
                </SidebarFooter>
            )}
        </ShadcnSidebar>
    );
};

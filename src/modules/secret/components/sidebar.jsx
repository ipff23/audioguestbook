import {
    Calendar,
    ChartArea,
    Home,
    Inbox,
    LibraryBig,
    LogOut,
    Search,
    Settings,
    SquarePlus,
    Users,
} from 'lucide-react';

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
import { Avatar } from '@/modules/shadcn/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/modules/shadcn/ui/button';
import { Logo } from '@/modules/main/components/logo';

export const Sidebar = () => {
    return (
        <ShadcnSidebar>
            <SidebarHeader>
                <Logo className='h-9 flex items-center ml-2' />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>BOOKS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
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
                                <SidebarMenuButton asChild>
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

            <SidebarFooter>
                <div className='flex items-center justify-between gap-2 p-2'>
                    <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col items-start justify-between'>
                        <span className='text-sm font-semibold'>Carlos</span>
                        <span className='text-xs text-muted-foreground'>carlos@gmail.com</span>
                    </div>

                    <Button variant='ghost' size='icon' className='ml-auto'>
                        <LogOut />
                    </Button>
                </div>
            </SidebarFooter>
        </ShadcnSidebar>
    );
};

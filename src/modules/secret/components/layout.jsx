import { Helmet } from 'react-helmet';

import { useDocumentClassNames } from '@/modules/core/hooks/use-document-class-names';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';

import { BreakpointIndicator } from '@/modules/core/components/breakpoint-indicator';
import { SidebarProvider, SidebarTrigger } from '@/modules/shadcn/ui/sidebar';
import { Sidebar } from '@/modules/secret/components/sidebar';

import { DarkModeToggle } from '@/modules/core/components/dark-mode-toggle';
import { DebugModeToggle } from '@/modules/core/components/debug-mode-toggle';

export const Layout = ({ title, children }) => {
    const [theme] = useDarkMode();

    useDocumentClassNames({
        root: theme,
        body: 'antialiased',
    });

    return (
        <>
            <Helmet defaultTitle='Guestbook' titleTemplate='%s | Guestbook'>
                {title && <title>{title}</title>}
            </Helmet>

            <BreakpointIndicator />

            <SidebarProvider>
                <Sidebar />

                <main className='w-full'>
                    <header className='sticky top-0 z-10 h-14 flex items-center justify-between p-2 gap-4 bg-background border-b'>
                        <div className='flex items-center gap-4'>
                            <SidebarTrigger />
                        </div>
                        <div className='flex items-center gap-2'>
                            <DebugModeToggle />
                            <DarkModeToggle />
                        </div>
                    </header>
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
};

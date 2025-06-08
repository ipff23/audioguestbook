import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Toaster } from '@/modules/shadcn/ui/sonner';

import { DarkModeProvider } from '@/modules/core/providers/dark-mode-provider';

const queryClient = new QueryClient();

export const Providers = ({ children }) => {
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <DarkModeProvider>
                    <Suspense>
                        {children}
                        <Toaster />
                    </Suspense>
                </DarkModeProvider>
            </QueryClientProvider>
        </NuqsAdapter>
    );
};

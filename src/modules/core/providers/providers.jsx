import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Toaster } from '@/modules/shadcn/ui/sonner';

import { BusProvider } from '@/modules/core/providers/bus-provider';
import { DarkModeProvider } from '@/modules/core/providers/dark-mode-provider';

const queryClient = new QueryClient();

export const Providers = ({ children }) => {
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <BusProvider>
                    <DarkModeProvider>
                        <Suspense>
                            {children}
                            <Toaster />
                        </Suspense>
                    </DarkModeProvider>
                </BusProvider>
            </QueryClientProvider>
        </NuqsAdapter>
    );
};

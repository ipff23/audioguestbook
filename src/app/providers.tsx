'use client';
import { NextUIProvider } from '@nextui-org/react';
import BusProvider from '@/providers/bus-provider';
import { type ChildrenContainer } from '@/types/common';

export function Providers({ children }: ChildrenContainer) {
    return (
        <BusProvider>
            <NextUIProvider>{children}</NextUIProvider>
        </BusProvider>
    );
}

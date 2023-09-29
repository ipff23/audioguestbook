'use client';
import { NextUIProvider } from '@nextui-org/react';
import { type ChildrenContainer } from '@/types/common';
import BusProvider from '@/providers/bus-provider';
import TrackListProvider from '@/providers/track-list-provider';

export function Providers({ children }: ChildrenContainer) {
    return (
        <BusProvider>
            <TrackListProvider>
                <NextUIProvider>{children}</NextUIProvider>
            </TrackListProvider>
        </BusProvider>
    );
}

'use client';
import dynamic from 'next/dynamic';
import { NextUIProvider } from '@nextui-org/react';
import { type ChildrenContainer } from '@/types/common';
import BusProvider from '@/providers/bus-provider';
// import TrackListProvider from '@/providers/track-list-provider';

const TrackListProvider = dynamic(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    () => import('@/providers/track-list-provider'),
    { ssr: false },
);

export function Providers({ children }: ChildrenContainer) {
    return (
        <BusProvider>
            <TrackListProvider>
                <NextUIProvider>{children}</NextUIProvider>
            </TrackListProvider>
        </BusProvider>
    );
}

'use client';
import { NextUIProvider } from '@nextui-org/react';

import type { ChildrenContainer } from '@/types/common';

export function Providers({ children }: ChildrenContainer) {
    return <NextUIProvider>{children}</NextUIProvider>;
}

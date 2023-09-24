import { $log } from '@/helpers/debug';
import { NextResponse } from 'next/server';
import { deleteSession } from '@/services/auth';

import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
    $log({ namespace: 'Login', content: 'cerrando sesion' });
    deleteSession();
    return NextResponse.redirect(new URL('/', request.url));
}

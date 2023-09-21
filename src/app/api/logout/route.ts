import { NextResponse } from 'next/server';
import { deleteSession } from '@/services/auth';

import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
    deleteSession();
    return NextResponse.redirect(new URL('/', request.url));
}

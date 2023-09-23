import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { readSessionFromRequest } from '@/services/auth';

function matchBaseRoute(request: NextRequest, basePath: string) {
    return request.nextUrl.pathname.startsWith(basePath);
}

function loginMiddleware(request: NextRequest, session: any) {
    if (session !== null) {
        return NextResponse.redirect(new URL('/secret', request.url));
    }

    return NextResponse.next();
}

function secretMiddleware(request: NextRequest, session: any) {
    if (session === null) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export async function middleware(request: NextRequest) {
    const session = await readSessionFromRequest(request);

    if (matchBaseRoute(request, '/login')) {
        return loginMiddleware(request, session);
    }
    if (matchBaseRoute(request, '/secret')) {
        return secretMiddleware(request, session);
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/login', '/secret/:path*'],
};

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

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

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (matchBaseRoute(req, '/login')) {
        return loginMiddleware(req, session);
    }

    if (matchBaseRoute(req, '/secret')) {
        return secretMiddleware(req, session);
    }

    return res;
}

export const config = {
    matcher: ['/login', '/secret/:path*'],
};

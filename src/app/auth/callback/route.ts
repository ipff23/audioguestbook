import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams;
    const code = query.get('code');

    if (code !== null) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
    }

    const targetUrl = `${request.nextUrl.origin}/secret`;

    console.log('targetUrl', targetUrl);

    return NextResponse.redirect(targetUrl);
}

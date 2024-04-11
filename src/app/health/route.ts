import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies });

    try {
        const { data } = await supabase.from('users').select('id');

        return Response.json({
            status: 'OK',
            data: data?.map(user => user.id),
        });
    } catch (error) {
        return Response.json({
            status: 'ERROR',
            error,
        });
    }
}

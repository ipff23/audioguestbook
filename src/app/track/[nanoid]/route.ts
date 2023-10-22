import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { kebabCase } from 'lodash';

export async function GET(request: Request, { params }: { params: { nanoid: string } }) {
    const supabase = createRouteHandlerClient({ cookies });

    const { data: track } = await supabase
        .from('tracks')
        .select('*')
        .eq('nanoid', params.nanoid)
        .single();

    const response = await fetch(track.url);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

    const filename = `${kebabCase(track.name)}.mp3`;

    const res = new NextResponse(response.body, {
        status: 200,
        headers: new Headers({
            'content-disposition': `attachment; filename=${filename}`,
            'content-type': 'audio/mpeg',
        }),
    });

    return res;
}

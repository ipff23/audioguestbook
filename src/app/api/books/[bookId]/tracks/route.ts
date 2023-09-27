import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

import { jsonResponse, requestHandler } from '@/helpers/http';

export const dynamic = 'force-dynamic';

export async function POST(
    request: Request,
    { params: { bookId } }: { params: { bookId: string } },
) {
    return await requestHandler(async () => {
        const supabase = createRouteHandlerClient({ cookies });
        const formData = await request.formData();

        const cover = formData.get('file') as File;

        const {
            data: { path: trackPath },
        }: any = await supabase.storage.from('tracks').upload(cover.name, cover, {
            cacheControl: '3600',
            upsert: true,
        });

        const {
            data: { publicUrl: trackUrl },
        } = supabase.storage.from('tracks').getPublicUrl(trackPath);

        const trackData = {
            book_id: bookId,
            nanoid: formData.get('nanoid'),
            name: formData.get('name'),
            url: trackUrl,
        };

        await supabase.from('tracks').insert(trackData);

        return jsonResponse({
            status: 201,
            data: trackData,
        });
    });
}

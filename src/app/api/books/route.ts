import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { parse } from 'date-fns';

import { nanoid } from '@/helpers/utils';
import { jsonResponse, requestHandler } from '@/helpers/http';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    return await requestHandler(async () => {
        const supabase = createRouteHandlerClient({ cookies });
        const formData = await request.formData();

        const cover = formData.get('cover') as File;

        const {
            data: { path: coverPath },
        }: any = await supabase.storage.from('covers').upload(cover.name, cover, {
            cacheControl: '3600',
            upsert: true,
        });

        const {
            data: { publicUrl: coverUrl },
        } = supabase.storage.from('covers').getPublicUrl(coverPath);

        const parsedDate = parse(formData.get('date') as string, 'yyyy-MM-dd', new Date());

        const bookData = {
            nanoid: nanoid(),
            name: formData.get('name'),
            date: parsedDate,
            cover: coverUrl,
        };

        await supabase.from('books').insert(bookData);

        return jsonResponse({
            status: 201,
            data: bookData,
        });
    });
}

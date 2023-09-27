'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export default async function createTrack(bookId: string, formData: FormData) {
    const supabase = createServerActionClient({ cookies });

    const file = formData.get('file') as File;

    const {
        data: { path: trackPath },
    }: any = await supabase.storage.from('tracks').upload(file.name, file, {
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
}

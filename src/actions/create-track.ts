'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import sha1 from 'crypto-js/sha1';
import { type PublicUrl, type UploadResultResolve } from '@/types/supabase';

export default async function createTrack(formData: FormData) {
    const supabase = createServerActionClient({ cookies });

    const file = formData.get('file') as File;
    const fileContent = await file.text();
    const hash = sha1(fileContent).toString();
    const fileName = `${hash}.mp3`;

    const {
        data: { path: trackPath },
    } = (await supabase.storage.from('tracks').upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
    })) as UploadResultResolve;

    const {
        data: { publicUrl: trackUrl },
    } = supabase.storage.from('tracks').getPublicUrl(trackPath) as PublicUrl;

    const trackData = {
        hash,
        url: trackUrl,
        book_id: formData.get('bookId'),
        index: formData.get('index'),
        nanoid: formData.get('nanoid'),
        name: formData.get('name'),
        duration: formData.get('duration'),
    };

    console.log(trackData);

    await supabase.from('tracks').insert(trackData);
}

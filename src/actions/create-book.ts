'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { parse } from 'date-fns';

import { nanoid } from '@/helpers/utils';

export default async function createBook(formData: FormData) {
    const supabase = createServerActionClient({ cookies });

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
}

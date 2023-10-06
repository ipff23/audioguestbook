'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export default async function updateTrack(formData: FormData) {
    const supabase = createServerActionClient({ cookies });

    const nanoid = formData.get('nanoid');

    const trackData = {
        index: formData.get('index'),
        name: formData.get('name'),
    };
    console.log(nanoid);
    console.log(trackData);
    const res = await supabase.from('tracks').update(trackData).eq('nanoid', nanoid);
    console.log(res);
}

'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export default async function removeTracks(tracksIds: string[]) {
    const supabase = createServerActionClient({ cookies });
    await supabase.from('tracks').delete().in('nanoid', tracksIds);
}

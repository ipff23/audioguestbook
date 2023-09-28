'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export default async function removeBook(bookId: string) {
    const supabase = createServerActionClient({ cookies });
    await supabase.from('books').delete().eq('id', bookId);
}

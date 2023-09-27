import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import MainContainer from '@/components/main-container';
import MainHeader from '@/components/main-header';
import BookEditor from '@/components/book-editor';

export const dynamic = 'force-dynamic';

export default async function Secret({ params: { id } }: { params: { id: string } }) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from('books').select('*').eq('id', id).single();

    return (
        <MainContainer background={data.cover}>
            <MainHeader />
            <BookEditor book={data} />
        </MainContainer>
    );
}

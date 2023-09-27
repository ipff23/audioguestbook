import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import BookItem from './book-item';

export default async function BooksList() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase
        .from('books')
        .select()
        .order('created_at', { ascending: false });

    return (
        <div className='flex flex-col gap-2'>
            {data?.map(book => (
                <BookItem
                    key={book.id}
                    id={book.id}
                    nanoid={book.nanoid}
                    name={book.name}
                    date={book.date}
                    cover={book.cover}
                />
            ))}
        </div>
    );
}

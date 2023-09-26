import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { customAlphabet } from 'nanoid';
import { parse } from 'date-fns';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);

export const dynamic = 'force-dynamic';

interface JsonResponse {
    status: number;
    data: any;
}

const jsonResponse = ({ status, data }: JsonResponse) => {
    return new Response(JSON.stringify({ data }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
};

export async function POST(request: Request) {
    try {
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
    } catch (error) {
        console.error(error);
        return jsonResponse({
            status: 400,
            data: { error },
        });
    }
}

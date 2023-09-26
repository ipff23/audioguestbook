import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import EyeIcon from '@/icons/eye-regular';
import PencilIcon from '@/icons/pencil-regular';

const BookItem = ({
    id,
    nanoid,
    name,
    date,
    cover,
}: {
    id: string;
    nanoid: string;
    name: string;
    date: string;
    cover: string;
}) => {
    return (
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50'>
            <CardBody className='flex flex-row gap-3 items-center'>
                <Image src={cover} height={52} width={52} radius='sm' />
                <div className='flex flex-col flex-1'>
                    <p className='text-md'>{name}</p>
                    <p className='text-small text-default-500'>
                        {format(new Date(date), 'MMMM do, yyyy')}
                    </p>
                </div>
                <Button
                    as={Link}
                    href={`/book/${nanoid}`}
                    variant='flat'
                    color='primary'
                    isIconOnly
                    isExternal
                >
                    <EyeIcon />
                </Button>

                <Button as={Link} href={`/secret/book/${id}`} variant='flat' isIconOnly>
                    <PencilIcon />
                </Button>
            </CardBody>
        </Card>
    );
};

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

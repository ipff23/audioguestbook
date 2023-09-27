import { format } from 'date-fns';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';

import { type Book } from '@/types/books';

import ExternalIcon from '@/icons/external-regular';

export interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    return (
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50' shadow='sm'>
            <CardBody>
                <div className='flex flex-col items-center'>
                    <Image
                        className='object-cover w-[150px] h-[150px] self-center'
                        src={book.cover}
                        width={150}
                        height={150}
                        shadow='md'
                    />
                </div>
                <div className='mt-4 flex flex-col gap-2 items-start max-w-[160px]'>
                    <h1 className='text-lg leading-5 hyphens-auto line-clamp-3' lang='es-MX'>
                        {book.name}
                    </h1>
                    <p className='text-sm text-slate-400'>
                        {format(new Date(book.date), 'MMMM do, yyyy')}
                    </p>
                    <Link
                        href={`/book/${book.nanoid}`}
                        isExternal
                        showAnchorIcon
                        anchorIcon={<ExternalIcon className='ml-1' size='1rem' />}
                    >
                        {book.nanoid}
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
}

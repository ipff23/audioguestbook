'use client';
import { format } from 'date-fns';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import ExternalIcon from '@/icons/external-regular';
import SaveIcon from '@/icons/floppy-disk-regular';

import TrackList, { type FileItem } from '@/components/track-list';
import UndoRegular from '@/icons/undo-regular';

interface Book {
    id: string;
    nanoid: string;
    created_at: string;
    name: string;
    date: string;
    cover: string;
}

export default function BookEditor({ book }: { book: Book }) {
    const handleTrackListChange = (trakList: FileItem[]) => {
        console.log(trakList);
    };

    return (
        <div className='flex flex-row gap-4 items-start'>
            <TrackList onChange={handleTrackListChange} />

            <div className='flex-none h-auto flex flex-col gap-4'>
                <Card
                    isBlurred
                    className='border-none bg-background/60 dark:bg-default-100/50'
                    shadow='sm'
                >
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
                            <h1 className='text-lg leading-5 hyphens-auto' lang='es-MX'>
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

                <Button color='primary' startContent={<SaveIcon />}>
                    Guardar
                </Button>

                <Button startContent={<UndoRegular />}>Restaurar</Button>
            </div>
        </div>
    );
}

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';

import { type SupabaseBook } from '@/types/books';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';

import MainContainer from '@/components/main-container';
import Logo from '@/components/logo';
import JsonViewer from '@/components/json-viewer';

import QueueFill from '@/icons/queue-fill';
import ExportRegular from '@/icons/export-regular';

import Player from './components/player';

export const dynamic = 'force-dynamic';

export interface BookProps {
    params: { id: string };
}

export default async function Book({ params: { id } }: BookProps) {
    const supabase = createServerComponentClient({ cookies });
    const { data: book } = (await supabase
        .from('books')
        .select('*, tracks(*)')
        .eq('nanoid', id)
        .single()) as SupabaseBook;

    return (
        <>
            <JsonViewer data={book} />
            <MainContainer
                background={book.cover}
                classNames={{
                    container: 'w-[460px] min-h-screen justify-center items-center select-none',
                }}
            >
                <Card
                    isBlurred
                    className='flex-none border-none bg-background/60 dark:bg-default-100/50'
                    shadow='sm'
                >
                    <CardBody className='flex flex-col gap-4 p-8'>
                        <div className='flex flex-row gap-4'>
                            <Button
                                isIconOnly
                                className='data-[hover]:bg-foreground/10'
                                variant='light'
                            >
                                <ExportRegular className='text-foreground/80 text-2xl' />
                            </Button>
                            <Logo className='flex-1 text-4xl text-black dark:text-white text-center' />
                            <Button
                                isIconOnly
                                className='data-[hover]:bg-foreground/10'
                                variant='light'
                            >
                                <QueueFill className='text-foreground/80 text-2xl' />
                            </Button>
                        </div>

                        <div className='flex justify-center mt-8'>
                            <Image
                                className='object-cover w-[320px] h-[320px]'
                                src={book.cover}
                                width={320}
                                height={320}
                                shadow='md'
                            />
                        </div>

                        <div className='select-text flex flex-col items-center mb-6'>
                            <h1 className='text-xl break-all line-clamp-2 text-center'>
                                {book.name}
                            </h1>
                            <p className='text-sm text-center'>
                                {format(new Date(book.date), 'MMMM do, yyyy')}
                            </p>
                        </div>

                        <Player trackUrl={book.tracks[0].url} />
                    </CardBody>
                </Card>
            </MainContainer>
        </>
    );
}

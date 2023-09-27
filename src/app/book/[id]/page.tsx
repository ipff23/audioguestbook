import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Progress } from '@nextui-org/progress';

import MainContainer from '@/components/main-container';
import Logo from '@/components/logo';
import RepeatOnceFill from '@/icons/repeat-once-fill';
import SkipBackFill from '@/icons/skip-back-fill';
import PauseFill from '@/icons/pause-fill';
import SkipForwardFill from '@/icons/skip-forward-fill';
import ShuffleFill from '@/icons/shuffle-fill';
import QueueFill from '@/icons/queue-fill';
import ExportRegular from '@/icons/export-regular';

export const dynamic = 'force-dynamic';

export interface BookProps {
    params: { id: string };
}

export default async function Book({ params: { id } }: BookProps) {
    const supabase = createServerComponentClient({ cookies });
    const { data: book } = await supabase
        .from('books')
        .select('*, tracks(*)')
        .eq('nanoid', id)
        .single();

    return (
        <MainContainer
            background={book.cover}
            classNames={{
                container: 'w-[460px] min-h-screen justify-center items-center',
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

                    <div className='flex flex-col items-center mb-6'>
                        <h1 className='text-xl break-all line-clamp-2 text-center'>{book.name}</h1>
                        <p className='text-sm text-center'>
                            {format(new Date(book.date), 'MMMM do, yyyy')}
                        </p>
                    </div>

                    <div className='flex flex-col mt-4 gap-1 w-full'>
                        <Progress
                            aria-label='Music progress'
                            classNames={{
                                indicator: 'bg-default-800 dark:bg-white',
                                track: 'bg-default-500/30',
                            }}
                            color='default'
                            size='sm'
                            value={33}
                        />
                        <div className='flex justify-between'>
                            <p className='text-small'>1:23</p>
                            <p className='text-small text-foreground/50'>4:32</p>
                        </div>
                    </div>

                    <div className='flex w-full items-center justify-center gap-2 mb-4'>
                        <Button
                            isIconOnly
                            className='data-[hover]:bg-foreground/10'
                            radius='full'
                            variant='light'
                        >
                            <RepeatOnceFill className='text-foreground/80 text-2xl' />
                        </Button>
                        <Button
                            isIconOnly
                            className='w-[52px] h-[52px] data-[hover]:bg-foreground/10'
                            radius='full'
                            variant='light'
                        >
                            <SkipBackFill className='text-2xl' />
                        </Button>
                        <Button
                            isIconOnly
                            className='w-[80px] h-[80px] data-[hover]:bg-foreground/10'
                            radius='full'
                            variant='light'
                        >
                            <PauseFill className='text-4xl' />
                        </Button>
                        <Button
                            isIconOnly
                            className='w-[52px] h-[52px] data-[hover]:bg-foreground/10'
                            radius='full'
                            variant='light'
                        >
                            <SkipForwardFill className='text-2xl' />
                        </Button>
                        <Button
                            isIconOnly
                            className='data-[hover]:bg-foreground/10'
                            radius='full'
                            variant='light'
                        >
                            <ShuffleFill className='text-foreground/80 text-2xl' />
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </MainContainer>
    );
}

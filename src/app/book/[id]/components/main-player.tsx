import { format } from 'date-fns';

import { type Book as BookEntity, type Track as TrackEnitity } from '@/types/books';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';

import Logo from '@/components/logo';

import QueueIcon from '@/icons/queue-fill';

import Player from './player';
import { cn } from '@/helpers/utils';

export interface MainPlayerProps {
    book: BookEntity & {
        tracks: TrackEnitity[];
    };
}

export default function MainPlayer({ book }: MainPlayerProps) {
    return (
        <Card
            className={cn(
                ' w-[400px] max-h-min flex-none border-none bg-background/60 dark:bg-default-100/50 transition-all',
                'md:rounded-r-none',
            )}
            shadow='sm'
            isBlurred
        >
            <CardBody className='flex flex-col gap-4 p-8'>
                <div className='flex flex-row gap-4 justify-between'>
                    <Logo className='flex-1 text-4xl text-black dark:text-white text-left' />
                    <Button isIconOnly className='data-[hover]:bg-foreground/10' variant='light'>
                        <QueueIcon className='text-foreground/80 text-2xl' />
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
                    <h1 className='text-xl break-all line-clamp-2 text-center'>{book.name}</h1>
                    <p className='text-sm text-center'>
                        {format(new Date(book.date), 'MMMM do, yyyy')}
                    </p>
                </div>

                <Player trackList={book.tracks} />
            </CardBody>
        </Card>
    );
}

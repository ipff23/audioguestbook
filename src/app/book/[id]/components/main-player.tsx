import { format } from 'date-fns';

import { type Book, type Track } from '@/types/books';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';

import Logo from '@/components/logo';

import QueueIcon from '@/icons/queue-fill';

import Player from './player';
import { cn } from '@/helpers/utils';

export interface MainPlayerProps {
    book: Book;
    trackList: Track[];
    showTracks?: boolean;
    onToggleTracks?: () => void;
}

export default function MainPlayer({
    book,
    trackList,
    showTracks,
    onToggleTracks,
}: MainPlayerProps) {
    return (
        <Card
            className={cn(
                'w-[400px] max-h-min flex-none border-none bg-background/60 dark:bg-default-100/50 transition-all relative z-10',
                'md:rounded-r-none',
                {
                    'rounded-large md:rounded-large': !showTracks,
                },
            )}
            shadow='sm'
            isBlurred
        >
            <CardBody className='flex flex-col gap-4 p-8'>
                <div className='flex flex-row gap-4 justify-between'>
                    <Logo className='flex-1 text-4xl text-black dark:text-white text-left' />
                    <Button
                        isIconOnly
                        className='data-[hover]:bg-foreground/10'
                        variant='light'
                        onClick={onToggleTracks}
                    >
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

                <Player trackList={trackList} />
            </CardBody>
        </Card>
    );
}

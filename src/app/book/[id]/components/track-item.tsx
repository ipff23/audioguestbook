import { Image } from '@nextui-org/image';
import NextImage from 'next/image';

import { type Book as BookEntity, type Track as TrackEnitity } from '@/types/books';
import { cn } from '@/helpers/utils';
import PlayIcon from '@/icons/play-fill';
import PauseIcon from '@/icons/pause-fill';

export interface TrackItemProps {
    book: BookEntity;
    track: TrackEnitity;
    trackNo: number;
    playing?: boolean;
    onPlay?: (trackNo: number) => void;
    onPause?: () => void;
}

export default function TrackItem({
    book,
    track,
    trackNo,
    playing,
    onPlay,
    onPause,
}: TrackItemProps) {
    const handleClick = () => {
        if (!playing) {
            onPlay?.(trackNo);
        } else {
            onPause?.();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                'group flex flex-row gap-4 items-center p-4 rounded-lg hover:bg-background/70 transition-all cursor-pointer',
                {
                    'bg-background/50': playing,
                },
            )}
        >
            {playing && (
                <div className='flex items-center justify-center'>
                    <div className='group-hover:hidden flex w-[32px] h-[32px] items-center justify-center'>
                        <NextImage
                            className='block dark:hidden w-[20px] h-[20px]'
                            src='/icons/animated-bars-black.gif'
                            alt=''
                            width={20}
                            height={20}
                        />
                        <NextImage
                            className='hidden dark:block w-[20px] h-[20px]'
                            src='/icons/animated-bars-white.gif'
                            alt=''
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className='group-hover:flex hidden w-[32px] h-[32px] items-center justify-center'>
                        <PauseIcon />
                    </div>
                </div>
            )}

            {!playing && (
                <div className='flex items-center justify-center'>
                    <div className='group-hover:hidden flex w-[32px] h-[32px] items-center justify-center'>
                        {track.index! + 1}
                    </div>
                    <div className='group-hover:flex hidden w-[32px] h-[32px] items-center justify-center'>
                        <PlayIcon />
                    </div>
                </div>
            )}

            <Image
                className='object-cover w-[56px] h-[56px]'
                src={book.cover}
                width={56}
                height={56}
            />
            <div className='flex flex-1 flex-col justify-center items-start'>
                <h2 className='text-slate-800 break-all line-clamp-2 text-left dark:text-slate-200 text-md uppercase font-semibold'>
                    {track.name}
                </h2>
                <p className='text-slate-600 dark:text-slate-400 text-sm'>{book.name}</p>
            </div>
        </button>
    );
}

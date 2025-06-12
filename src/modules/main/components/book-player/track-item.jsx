import { Pause, Play } from '@/modules/core/components/icons';
import { cn } from '@/modules/core/helpers/utils';
import { AudioLinesIcon } from '@/modules/shadcn/ui/audio-lines';
import { Button } from '@/modules/shadcn/ui/button';
import { Download } from 'lucide-react';

export const TrackItem = ({ className, book, track, trackNo, playing, onPlay, onPause }) => {
    const handleClick = () => {
        if (!playing) {
            onPlay?.(trackNo);
        } else {
            onPause?.();
        }
    };
    return (
        <div
            className={cn(
                'group/track flex flex-row gap-4 items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all cursor-pointer',
                {
                    'bg-gray-300/40 hover:bg-gray-300/40 dark:bg-gray-900/70 dark:hover:bg-gray-900/70':
                        playing,
                },
                className,
            )}
            onClick={handleClick}
        >
            {playing && (
                <div className='flex-center'>
                    <div className='group-hover/track:hidden flex-center size-[32px] [&_svg]:size-[20px]'>
                        <AudioLinesIcon autoplay />
                    </div>
                    <div className='group-hover/track:flex-center hidden size-[32px]'>
                        <Pause />
                    </div>
                </div>
            )}

            {!playing && (
                <div className='flex-center'>
                    <div className='group-hover/track:hidden flex-center size-[32px]'>
                        {track.index + 1}
                    </div>
                    <div className='group-hover/track:flex-center hidden size-[32px]'>
                        <Play />
                    </div>
                </div>
            )}

            <img src={book.cover} className='size-12 rounded-md object-cover shadow-xs' />

            <div className='flex flex-col'>
                <p className='text-sm font-medium break-all line-clamp-1 text-ellipsis'>
                    {track.name}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>{book.name}</p>
            </div>

            <Button
                asChild
                size='icon'
                className='text-gray-600 bg-gray-100 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-700/80'
            >
                <a href={track.url} download={`${track.name}.mp3`}>
                    <Download />
                </a>
            </Button>
        </div>
    );
};

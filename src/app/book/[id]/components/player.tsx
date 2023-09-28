'use client';

import TrackBar from './track-bar';
import PlayPauseButton from './play-pause-button';
import RepeatButton from './repeat-button';
import ShuffleButton from './shuffle-button';
import SkipBackButton from './skip-back-button';
import SkipForwardButton from './skip-forward-button';
import Timer from './timer';

export default function Player() {
    return (
        <>
            <div className='flex flex-col mt-4 gap-1 w-full'>
                <TrackBar value={33} />
                <Timer />
            </div>

            <div className='flex w-full items-center justify-center gap-2 mb-4'>
                <RepeatButton />
                <SkipBackButton />
                <PlayPauseButton />
                <SkipForwardButton />
                <ShuffleButton />
            </div>
        </>
    );
}

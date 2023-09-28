'use client';

import { useTrack } from '@/hooks/use-track';

import TrackBar from './track-bar';
import Timer from './timer';
import PlayPauseButton from './play-pause-button';
import RepeatButton, { RepeatState } from './repeat-button';
import ShuffleButton from './shuffle-button';
import SkipBackButton from './skip-back-button';
import SkipForwardButton from './skip-forward-button';
import { useEffect, useState } from 'react';

export interface PlayerProps {
    trackUrl: string;
}

export default function Player({ trackUrl }: PlayerProps) {
    const { buffering, playing, currentTime, duration, play, pause, load, seek } = useTrack();

    const [repeatState, setRepeatSate] = useState<RepeatState>(RepeatState.NoRepeat);
    const [shuffling, setShuffling] = useState<boolean>(false);

    useEffect(() => {
        load(trackUrl);
    }, []);

    const handleSeek = ({ value }: { progress: number; value: number }) => {
        seek(value, true);
    };

    return (
        <>
            <div className='flex flex-col mt-4 gap-1 w-full'>
                <TrackBar value={currentTime} maxValue={duration} onChange={handleSeek} />
                <Timer currentTime={currentTime} duration={duration} />
            </div>

            <div className='flex w-full items-center justify-center gap-2 mb-4'>
                <RepeatButton state={repeatState} onChange={newState => setRepeatSate(newState)} />
                <SkipBackButton />
                <PlayPauseButton
                    playing={playing}
                    buffering={buffering}
                    onPause={pause}
                    onPlay={play}
                />
                <SkipForwardButton />
                <ShuffleButton
                    shuffling={shuffling}
                    onChange={toggledShufling => setShuffling(toggledShufling)}
                />
            </div>
        </>
    );
}

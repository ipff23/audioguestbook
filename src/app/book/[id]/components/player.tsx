'use client';

import { useTrackList } from '@/providers/track-list-provider';
import { type Track as TrackEnitity } from '@/types/books';

import TrackBar from './track-bar';
import Timer from './timer';
import PlayPauseButton from './play-pause-button';
import RepeatButton from './repeat-button';
import ShuffleButton from './shuffle-button';
import SkipBackButton from './skip-back-button';
import SkipForwardButton from './skip-forward-button';
import { useEffect } from 'react';

export interface PlayerProps {
    trackList: TrackEnitity[];
}

export default function Player({ trackList }: PlayerProps) {
    const {
        // ...
        playing,
        buffering,
        currentTime,
        duration,
        shuffling,
        repeatState,
        currentTrack,
        currentTrackNo,
        start,
        play,
        pause,
        seek,
        skipBack,
        skipForward,
        repeat,
        shuffle,
        setTracks,
    } = useTrackList();

    const handleSeek = ({ value }: { progress: number; value: number }) => {
        seek(value, true);
    };

    const handlePlay = () => {
        if (!currentTrack) {
            start();
        } else {
            play();
        }
    };

    useEffect(() => {
        setTracks(trackList);
    }, [trackList]);

    return (
        <>
            <div className='flex flex-col mt-4 gap-1 w-full'>
                <TrackBar value={currentTime} maxValue={duration} onChange={handleSeek} />
                <Timer
                    currentTime={currentTime}
                    duration={duration}
                    currentTrackNo={currentTrackNo + 1}
                    totalTracks={trackList.length}
                />
            </div>

            <div className='flex w-full items-center justify-center gap-2 mb-4'>
                <RepeatButton state={repeatState} onChange={repeat} />
                <SkipBackButton onClick={skipBack} />
                <PlayPauseButton
                    playing={playing}
                    buffering={buffering}
                    onPause={pause}
                    onPlay={handlePlay}
                />
                <SkipForwardButton onClick={skipForward} />
                <ShuffleButton shuffling={shuffling} onChange={shuffle} />
            </div>
        </>
    );
}

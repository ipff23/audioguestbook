import { createContext, useContext, useState } from 'react';

import { int as randomInt } from '@/modules/core/helpers/random';
import { useMap } from '@/modules/core/hooks/use-map';
import { useHistory } from '@/modules/core/hooks/use-history';
import { useEventListener } from '@/modules/core/hooks/use-event-listener';
import { useTrack } from '../hooks/use-track';

const RepeatState = {
    RepeatAll: 'RepeatAll',
    RepeatOne: 'RepeatOne',
    NoRepeat: 'NoRepeat',
};

export const defaultTrackPayload = {
    playing: false,
    buffering: false,
    currentTime: 0,
    duration: 0,
    shuffling: false,
    repeatState: RepeatState.NoRepeat,
    currentTrack: undefined,
    currentTrackNo: 0,
    start: () => {},
    load: () => {},
    play: () => {},
    playAt: () => {},
    pause: () => {},
    seek: () => {},
    skipBack: () => {},
    skipForward: () => {},
    repeat: () => {},
    shuffle: () => {},
    setTracks: () => {},
};

export const getNextNumber = (current, max, shuffling) => {
    if (!shuffling) {
        return current < max ? current + 1 : 0;
    }

    return randomInt(0, max);
};

const TrackListContext = createContext(defaultTrackPayload);

export const useTrackList = () => {
    return useContext(TrackListContext);
};

const useInternalTrackList = () => {
    const [tracks, tracksManager] = useMap();
    const [, historyManager] = useHistory();

    const [currentTrackNo, setCurrentTrackNo] = useState(0);
    const [currentTrack, setCurrentTrack] = useState();

    const track = useTrack();
    const [repeatState, setRepeatState] = useState(RepeatState.NoRepeat);
    const [shuffling, setShuffling] = useState(false);

    const load = url => track.load(url);
    const play = url => track.play(url);
    const pause = () => track.pause();
    const seek = (time, playOnSeek = false) => track.seek(time, playOnSeek);

    const skipBack = () => {
        pause();
        // Remove current from history
        historyManager.pop();
        const historyItem = historyManager.pop();

        if (historyItem) {
            seek(0);
            const [newTrackNo, newTrack] = historyItem;

            setCurrentTrackNo(newTrackNo);
            setCurrentTrack(newTrack);
            play(newTrack?.url);
        }
    };

    const skipForward = () => {
        pause();
        seek(0);

        const newTrackNo = getNextNumber(currentTrackNo, tracks.size - 1, shuffling);
        const newTrack = tracksManager.get(newTrackNo);

        setCurrentTrackNo(newTrackNo);
        setCurrentTrack(newTrack);
        historyManager.push([newTrackNo, newTrack]);
        play(newTrack?.url);
    };

    const repeat = value => setRepeatState(value);
    const shuffle = value => setShuffling(value);

    const setTracks = (trackList = []) => {
        pause();
        tracksManager.reset();
        trackList.forEach((trackItem, index) => tracksManager.set(index, trackItem));
    };

    const playNext = () => {
        if (repeatState === RepeatState.RepeatAll) {
            skipForward();
            return;
        }

        if (repeatState === RepeatState.RepeatOne) {
            seek(0, true);
            return;
        }

        if (currentTrackNo + 1 < tracks.size - 1) {
            skipForward();
        }
    };

    const start = () => {
        const firstTrack = tracksManager.get(0);
        setCurrentTrack(firstTrack);
        setCurrentTrackNo(0);
        historyManager.push([0, firstTrack]);
        track.play(firstTrack.url);
    };

    const playAt = trackNo => {
        const selectedTrack = tracksManager.get(trackNo);
        setCurrentTrack(selectedTrack);
        setCurrentTrackNo(trackNo);
        historyManager.push([trackNo, selectedTrack]);
        track.play(selectedTrack.url);
    };

    const handleTrackEnded = () => {
        playNext();
    };

    useEventListener(track.$track, 'ended', handleTrackEnded, {}, [
        repeatState,
        currentTrackNo,
        tracks.size,
    ]);

    return {
        playing: track.playing,
        buffering: track.buffering,
        currentTime: track.currentTime,
        duration: track.duration,
        shuffling,
        repeatState,
        currentTrack,
        currentTrackNo,
        start,
        load,
        play,
        playAt,
        pause,
        seek,
        skipBack,
        skipForward,
        repeat,
        shuffle,
        setTracks,
    };
};

export default function TrackListProvider({ children }) {
    const trackList = useInternalTrackList();
    return <TrackListContext.Provider value={trackList}>{children}</TrackListContext.Provider>;
}

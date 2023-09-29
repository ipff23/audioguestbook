'use client';
import { createContext, useContext, useState } from 'react';
import { useMap } from 'ahooks';

import { type ChildrenContainer } from '@/types/common';
import { type Track as TrackEnitity } from '@/types/books';
import { RepeatState } from '@/types/player';
import { useTrack } from '@/hooks/use-track';
import { getNextNumber } from '@/helpers/maths';
import { useHistory } from '@/hooks/use-history';
import { useEventListener } from '@/hooks/use-event-listener';

export interface TrackList {
    playing: boolean;
    buffering: boolean;
    currentTime: number;
    duration: number;
    shuffling: boolean;
    repeatState: RepeatState;
    currentTrack?: TrackEnitity;
    currentTrackNo: number;
    start: () => void;
    load: (url: string) => void;
    play: (url?: string) => void;
    playAt: (trackNo: number) => void;
    pause: () => void;
    seek: (time: number, playOnSeek?: boolean) => void;
    skipBack: () => void;
    skipForward: () => void;
    repeat: (value: RepeatState) => void;
    shuffle: (value: boolean) => void;
    setTracks: (trackList: TrackEnitity[]) => void;
}

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
    load: (url: string) => {},
    play: (url?: string) => {},
    playAt: (trackNo: number) => {},
    pause: () => {},
    seek: (time: number, playOnSeek: boolean = false) => {},
    skipBack: () => {},
    skipForward: () => {},
    repeat: (value: RepeatState) => {},
    shuffle: (value: boolean) => {},
    setTracks: (trackList: TrackEnitity[]) => {},
};

const TrackListContext = createContext<TrackList>(defaultTrackPayload);

export const useTrackList = () => {
    return useContext(TrackListContext);
};

const useInternalTrackList = () => {
    const [tracks, tracksManager] = useMap<number, TrackEnitity>();
    const [, historyManager] = useHistory<[number, TrackEnitity]>();

    const [currentTrackNo, setCurrentTrackNo] = useState<number>(0);
    const [currentTrack, setCurrentTrack] = useState<TrackEnitity>();

    const track = useTrack();
    const [repeatState, setRepeatState] = useState<RepeatState>(RepeatState.NoRepeat);
    const [shuffling, setShuffling] = useState<boolean>(false);

    const load = (url: string) => {
        track.load(url);
    };
    const play = (url?: string) => {
        track.play(url);
    };
    const pause = () => {
        track.pause();
    };
    const seek = (time: number, playOnSeek: boolean = false) => {
        track.seek(time, playOnSeek);
    };

    const skipBack = () => {
        pause();
        // Remove current from history
        historyManager.pop();
        const historyItem = historyManager.pop() as [number, TrackEnitity];

        if (historyItem) {
            seek(0);
            const [newTrackNo, newTrack] = historyItem;
            setCurrentTrackNo(newTrackNo);
            setCurrentTrack(newTrack);
            // historyManager.push([newTrackNo, newTrack]);
            play(newTrack?.url);
        }
    };

    // Quizá implementar una mecánica de "la bolsa"
    // Meter todos los tracks en la bolsa e irlos sacando de uno en uno
    // Cuando la bolsa se quede sin tracks, meterlos de nuevo y volver a sacarlos uno a uno
    // Puede ser en orden o aleatorio
    const skipForward = () => {
        pause();
        seek(0);
        const newTrackNo = getNextNumber(currentTrackNo, tracks.size - 1, shuffling);
        const newTrack = tracksManager.get(newTrackNo) as TrackEnitity;

        setCurrentTrackNo(newTrackNo);
        setCurrentTrack(newTrack);
        historyManager.push([newTrackNo, newTrack]);
        play(newTrack?.url);
    };

    const repeat = (value: RepeatState) => {
        setRepeatState(value);
    };
    const shuffle = (value: boolean) => {
        setShuffling(value);
    };

    const setTracks = (trackList: TrackEnitity[]) => {
        pause();
        tracksManager.reset();
        trackList.forEach((trackItem: TrackEnitity, index: number) => {
            tracksManager.set(index, trackItem);
        });
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

        // Al llegar al final no se detiene,
        // se repite desde una antes y se queda ciclado en esa canción
        if (currentTrackNo + 1 < tracks.size - 1) {
            skipForward();
        }
    };
    const start = () => {
        const firstTrack = tracksManager.get(0) as TrackEnitity;
        setCurrentTrack(firstTrack);
        setCurrentTrackNo(0);
        historyManager.push([0, firstTrack]);
        track.play(firstTrack.url);
    };
    const playAt = (trackNo: number) => {
        console.log(trackNo);
        const selectedTrack = tracksManager.get(trackNo) as TrackEnitity;
        setCurrentTrack(selectedTrack);
        setCurrentTrackNo(trackNo);
        historyManager.push([trackNo, selectedTrack]);
        track.play(selectedTrack.url);
    };

    const handleTrackEnded = () => {
        playNext();
    };

    useEventListener(track.$track, 'ended', handleTrackEnded);

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

export default function TrackListProvider({ children }: ChildrenContainer) {
    const trackList = useInternalTrackList();
    return <TrackListContext.Provider value={trackList}>{children}</TrackListContext.Provider>;
}

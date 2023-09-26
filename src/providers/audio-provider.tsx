'use client';
import { createContext, useContext } from 'react';
import { type ChildrenContainer } from '@/types/common';

import { type Track, useTrack } from '@/hooks/use-track';

const defaultAudioPayload = {
    playing: false,
    buffering: false,
    currentTime: 0,
    duration: 0,
    load: (url: string) => {},
    play: (url?: string) => {},
    pause: () => {},
};

const AudioContext = createContext<Track>(defaultAudioPayload);

export const useAudio = () => {
    return useContext(AudioContext);
};

export default function AudioProvider({ children }: ChildrenContainer) {
    const track = useTrack();
    return <AudioContext.Provider value={track}>{children}</AudioContext.Provider>;
}

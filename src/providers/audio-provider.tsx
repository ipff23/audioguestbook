'use client';
import { createContext, useContext } from 'react';
import { type ChildrenContainer } from '@/types/common';
import { type Track, useTrack, defaultTrackPayload } from '@/hooks/use-track';

const AudioContext = createContext<Track>(defaultTrackPayload);

export const useAudio = () => {
    return useContext(AudioContext);
};

export default function AudioProvider({ children }: ChildrenContainer) {
    const track = useTrack();
    return <AudioContext.Provider value={track}>{children}</AudioContext.Provider>;
}

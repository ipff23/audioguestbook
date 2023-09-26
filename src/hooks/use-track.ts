import { useEffect, useRef, useState } from 'react';

export interface Track {
    playing: boolean;
    buffering: boolean;
    currentTime: number;
    duration: number;
    load: (url: string) => void;
    play: (url?: string) => void;
    pause: () => void;
}

export const useTrack = (): Track => {
    const $track = useRef<HTMLAudioElement>(document.createElement('audio'));

    const [playing, setPlaying] = useState<boolean>(false);
    const [buffering, setBuffering] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const instantiate = () => {
        $track.current = document.createElement('audio');
        document.body.appendChild($track.current);
    };

    const uninstantiate = () => {
        $track.current?.remove();
    };

    const load = (url: string) => {
        if (!$track.current?.src.includes(url)) {
            $track.current?.setAttribute('src', url);
            $track.current?.load();
        }
    };

    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const play = (url?: string | null) => {
        if (url) {
            load(url);
        }
        $track.current?.play();
    };

    const pause = () => {
        $track.current?.pause();
    };

    const handleDurationChange = () => {
        setDuration($track.current?.duration);
    };

    const handleProgress = () => {
        setCurrentTime($track.current?.currentTime);
    };

    const handlePlay = () => {
        setPlaying(true);
    };

    const handlePause = () => {
        setPlaying(false);
    };

    const handleEnded = () => {
        setPlaying(false);
    };

    const handleBuffer = () => {
        setBuffering(true);
        setPlaying(false);
    };

    const handleResume = () => {
        setBuffering(false);
        setPlaying(true);
    };

    useEffect(() => {
        instantiate();

        $track.current?.addEventListener('timeupdate', handleProgress);
        $track.current?.addEventListener('durationchange', handleDurationChange);
        $track.current?.addEventListener('play', handlePlay);
        $track.current?.addEventListener('pause', handlePause);
        $track.current?.addEventListener('ended', handleEnded);
        $track.current?.addEventListener('waiting', handleBuffer);
        $track.current?.addEventListener('playing', handleResume);

        return () => {
            $track.current?.removeEventListener('play', handlePlay);
            $track.current?.removeEventListener('pause', handlePause);
            $track.current?.removeEventListener('ended', handleEnded);
            $track.current?.removeEventListener('waiting', handleBuffer);
            $track.current?.removeEventListener('playing', handleResume);

            uninstantiate();
        };
    }, []);

    return {
        playing,
        buffering,
        currentTime,
        duration,
        load,
        play,
        pause,
    };
};

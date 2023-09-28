import { useEffect, useRef, useState } from 'react';

export interface TrackArgs {
    onProgress?: (...args: any[]) => void;
    onDurationChange?: (...args: any[]) => void;
    onPlay?: (...args: any[]) => void;
    onPause?: (...args: any[]) => void;
    onEnded?: (...args: any[]) => void;
    onBuffering?: (...args: any[]) => void;
    onResume?: (...args: any[]) => void;
}

export interface Track {
    playing: boolean;
    buffering: boolean;
    currentTime: number;
    duration: number;
    load: (url: string) => void;
    play: (url?: string) => void;
    pause: () => void;
    seek: (time: number, playOnSeek?: boolean) => void;
}

export const defaultTrackPayload = {
    playing: false,
    buffering: false,
    currentTime: 0,
    duration: 0,
    load: (url: string) => {},
    play: (url?: string) => {},
    pause: () => {},
    seek: (time: number, playOnSeek: boolean = false) => {},
};

export const useTrack = ({
    onProgress,
    onDurationChange,
    onPlay,
    onPause,
    onEnded,
    onBuffering,
    onResume,
}: TrackArgs): Track => {
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

    const seek = (time: number, playOnSeek: boolean = false) => {
        if (!Number.isNaN(time) && Number.isFinite(time)) {
            $track.current.currentTime = time;

            if (playOnSeek) {
                $track.current?.play();
            }
        }
    };

    const handleDurationChange = (...args: any[]) => {
        setDuration($track.current?.duration);
        onDurationChange?.(...args);
    };

    const handleProgress = (...args: any[]) => {
        setCurrentTime($track.current?.currentTime);
        onProgress?.(...args);
    };

    const handlePlay = (...args: any[]) => {
        setPlaying(true);
        onPlay?.(...args);
    };

    const handlePause = (...args: any[]) => {
        setPlaying(false);
        onPause?.(...args);
    };

    const handleEnded = (...args: any[]) => {
        setPlaying(false);
        onEnded?.(...args);
    };

    const handleBuffer = (...args: any[]) => {
        setBuffering(true);
        setPlaying(false);
        onBuffering?.(...args);
    };

    const handleResume = (...args: any[]) => {
        setBuffering(false);
        setPlaying(true);
        onResume?.(...args);
    };

    const bindEvents = () => {
        $track.current?.addEventListener('timeupdate', handleProgress);
        $track.current?.addEventListener('durationchange', handleDurationChange);
        $track.current?.addEventListener('play', handlePlay);
        $track.current?.addEventListener('pause', handlePause);
        $track.current?.addEventListener('ended', handleEnded);
        $track.current?.addEventListener('waiting', handleBuffer);
        $track.current?.addEventListener('playing', handleResume);
    };

    const unbindEvents = () => {
        $track.current?.removeEventListener('play', handlePlay);
        $track.current?.removeEventListener('pause', handlePause);
        $track.current?.removeEventListener('ended', handleEnded);
        $track.current?.removeEventListener('waiting', handleBuffer);
        $track.current?.removeEventListener('playing', handleResume);
    };

    useEffect(() => {
        instantiate();
        bindEvents();

        return () => {
            unbindEvents();
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
        seek,
    };
};

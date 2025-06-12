import { useEffect, useRef, useState } from 'react';

export const defaultTrackPayload = {
    playing: false,
    buffering: false,
    currentTime: 0,
    duration: 0,
    load: () => {},
    play: () => {},
    pause: () => {},
    seek: () => {},
};

export const useTrack = ({
    onProgress,
    onDurationChange,
    onPlay,
    onPause,
    onEnded,
    onBuffering,
    onResume,
} = {}) => {
    const $track = useRef(document.createElement('audio'));

    const [playing, setPlaying] = useState(false);
    const [buffering, setBuffering] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const instantiate = () => {
        $track.current = document.createElement('audio');
        document.body.appendChild($track.current);
    };

    const uninstantiate = () => {
        $track.current?.remove();
    };

    const load = url => {
        $track.current?.setAttribute('src', url);
        $track.current?.load();
    };

    const play = url => {
        if (url) load(url);
        $track.current?.play();
    };

    const pause = () => {
        $track.current?.pause();
    };

    const seek = (time, playOnSeek = false) => {
        if (!Number.isNaN(time) && Number.isFinite(time)) {
            $track.current.currentTime = time;

            if (playOnSeek) $track.current?.play();
        }
    };

    const handleDurationChange = (...args) => {
        setDuration($track.current?.duration);
        onDurationChange?.(...args);
    };

    const handleProgress = (...args) => {
        setCurrentTime($track.current?.currentTime);
        onProgress?.(...args);
    };

    const handlePlay = (...args) => {
        setPlaying(true);
        onPlay?.(...args);
    };

    const handlePause = (...args) => {
        setPlaying(false);
        onPause?.(...args);
    };

    const handleEnded = (...args) => {
        setPlaying(false);
        onEnded?.(...args);
    };

    const handleBuffer = (...args) => {
        setBuffering(true);
        setPlaying(false);
        onBuffering?.(...args);
    };

    const handleResume = (...args) => {
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
        $track: $track.current,
    };
};

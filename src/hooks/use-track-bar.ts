import { type RefObject, useState, useEffect } from 'react';
import { useMouse } from '@uidotdev/usehooks';
import { getPercent, clamp, getFromPercent, awayTo } from '@/helpers/maths';
import { useWindowEventListener } from './use-window-event-listener';
export interface TrackBarArgs {
    trackRef: RefObject<HTMLDivElement>;
    minValue?: number;
    maxValue?: number;
    value?: number;
    onChange?: ({ progress, value }: { progress: number; value: number }) => void;
}

const getProgressFromClick = (trackRect?: DOMRect, clickX?: number): number => {
    const trackMax = trackRect?.width ?? 1;
    const clickValue = (clickX ?? 0) - (trackRect?.x ?? 0);

    const progress = getPercent(clickValue, trackMax);
    return clamp(progress, 0, 100);
};

export function useTrackBar({
    trackRef,
    minValue = 0,
    maxValue = 100,
    value = 0,
    onChange,
}: TrackBarArgs) {
    if (trackRef === null) {
        throw new Error('[useTrackBar] Track reference is missing');
    }

    const [mouse] = useMouse();

    const [progress, setProgress] = useState<number>(0);
    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const updateProgress = (clientX: number) => {
        const newProgress = getProgressFromClick(
            trackRef.current?.getBoundingClientRect(),
            clientX,
        );
        setProgress(newProgress);
    };

    const handleClick = () => {
        // updateProgress(ev.clientX);
    };

    const handleMouseDown = () => {
        setMouseDown(true);
    };

    const handleMouseUp = () => {
        setMouseDown(false);
    };

    useEffect(() => {
        if (!mouseDown) {
            const newValue = getFromPercent(progress, maxValue);

            if (awayTo(newValue, value, 3)) {
                onChange?.({
                    progress,
                    value: newValue,
                });
            }
        }
    }, [mouseDown]);

    useWindowEventListener('mouseup', handleMouseUp);

    useEffect(() => {
        if (mouseDown) {
            updateProgress(mouse.x);
        }
    }, [mouse, mouseDown]);

    useEffect(() => {
        if (!mouseDown) {
            const updatedProgress = getPercent(value, maxValue - minValue);
            setProgress(updatedProgress);
        }
    }, [value, maxValue, minValue]);

    return {
        progress,
        mouseDown,
        clickToChange: handleClick,
        setMouseDown: handleMouseDown,
        setMouseUp: handleMouseUp,
    };
}

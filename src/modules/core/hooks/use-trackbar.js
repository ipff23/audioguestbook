import { useState, useEffect } from 'react';
import { useMouse } from '@uidotdev/usehooks';
import { getPercent, clamp, getFromPercent, awayTo } from '@/modules/core/helpers/maths';
import { useWindowEventListener } from '@/modules/core/hooks/use-window-event-listener';

const getProgressFromClick = (trackRect, clickX) => {
    const trackMax = trackRect?.width ?? 1;
    const clickValue = (clickX ?? 0) - (trackRect?.x ?? 0);

    const progress = getPercent(clickValue, trackMax);
    return clamp(progress, 0, 100);
};

export const useTrackbar = ({ trackRef, minValue = 0, maxValue = 100, value = 0, onChange }) => {
    if (trackRef === null) {
        throw new Error('[useTrackbar] Track reference is missing');
    }

    const [mouse] = useMouse();

    const [progress, setProgress] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

    const updateProgress = clientX => {
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
};

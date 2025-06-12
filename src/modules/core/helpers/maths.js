export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getPercent = (partial, total) => Math.floor((partial / total) * 100);

export const getFromPercent = (percent, total) => (total / 100) * percent;

export const nearTo = (value, reach, threshold = 0.3) => {
    return reach + threshold > value && reach - threshold < value;
};

export const awayTo = (value, reach, threshold = 0.3) => {
    return !(reach + threshold > value && reach - threshold < value);
};

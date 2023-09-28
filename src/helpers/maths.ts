export const clamp = (num: number, min: number, max: number): number =>
    Math.min(Math.max(num, min), max);

export const getPercent = (partial: number, total: number): number =>
    Math.floor((partial / total) * 100);

export const getFromPercent = (percent: number, total: number): number => (total / 100) * percent;

export const nearTo = (value: number, reach: number, threshold: number = 0.3): boolean => {
    return reach + threshold > value && reach - threshold < value;
};

export const awayTo = (value: number, reach: number, threshold: number = 0.3): boolean => {
    return !(reach + threshold > value && reach - threshold < value);
};

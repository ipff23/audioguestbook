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

export const randomNumber = (min: number, max: number): number => {
    return Math.random() * (max + 1 - min) + min;
};

export const randomInt = (min: number, max: number): number => Math.floor(randomNumber(min, max));

export const getNextNumber = (current: number, max: number, shuffling: boolean): number => {
    if (!shuffling) {
        return current < max ? current + 1 : 0;
    }

    return randomInt(0, max);
};

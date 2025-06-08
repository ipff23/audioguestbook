export const random = () => Math.random();

export const number = (min, max) => Math.random() * (max - min) + min;

export const int = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const bigInt = (min, max) => {
    min = BigInt(min);
    max = BigInt(max);
    const range = max - min + 1n;
    const rand = BigInt(Math.floor(Math.random() * Number(range)));
    return min + rand;
};

export const boolean = (factor = 0.5) => Math.random() < factor;

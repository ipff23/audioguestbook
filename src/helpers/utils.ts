import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const nanoid = customAlphabet(
    '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    10,
);

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export const nanoid = customAlphabet(
    '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    10,
);

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

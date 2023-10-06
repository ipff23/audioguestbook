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

export const downloadLink = (url: string, name: string = 'file.link') => {
    if (url.trim() === '') {
        console.warn('There is not any URL to download.');
        return;
    }

    const link = document.createElement('a');

    link.href = url;
    link.download = name;
    link.target = '_blank';

    document.body.appendChild(link);

    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
        }),
    );

    document.body.removeChild(link);
};

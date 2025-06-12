import { createElement, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { customAlphabet } from 'nanoid';

export const nanoid = customAlphabet(
    '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    10,
);

export const getId = () => Math.random().toString(36).slice(2);

export const getKey = prefix => {
    return `${prefix}__${getId()}`;
};
export const getFileSha1 = async file => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const pipe = fns => value => fns.reduce((acc, fn) => fn(acc), value);

export const styled = (baseComponent, className) => {
    return forwardRef(({ children, className: classNameToOverride, ...props }, ref) => {
        return createElement(
            baseComponent,
            { className: cn(className, classNameToOverride), ref, ...props },
            children,
        );
    });
};

export const hasAllowedType = (file, allowedTypes) => {
    return allowedTypes.split(',').some(type => type.trim() === file?.type);
};

export const buildQueryParams = (payload, prefix = '?') => {
    const queryParams = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
        if (value) {
            queryParams.append(key, value);
        }
    });

    if (queryParams.size === 0) {
        return '';
    }

    return prefix + queryParams.toString();
};

export function match(action) {
    let hasMatch = false;
    let finalHandler = null;

    return {
        with(pattern, handler) {
            if (!hasMatch) {
                const entries = Object.entries(pattern);
                const isMatching = entries.every(([key, value]) => {
                    return action[key] === value;
                });

                if (isMatching) {
                    hasMatch = true;
                    finalHandler = handler;
                }
            }
            return this;
        },
        when(matcher, handler) {
            if (!hasMatch && matcher(action)) {
                hasMatch = true;
                finalHandler = handler;
            }
            return this;
        },
        otherwise(handler) {
            if (!hasMatch) {
                finalHandler = handler;
            }
            return this;
        },
        run() {
            return finalHandler?.(action) || finalHandler;
        },
    };
}

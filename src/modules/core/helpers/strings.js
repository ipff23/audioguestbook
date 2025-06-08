import {
    camelCase,
    capitalize,
    snakeCase,
    trim,
    lowerCase,
    upperCase,
    deburr,
    kebabCase,
} from 'lodash';

import { pipe } from './utils';

const toString = str => str.toString();

export const pascalCase = str => {
    const camel = camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};

export const capCase = str => {
    const snake = snakeCase(str).split('_');
    return snake.map(word => capitalize(word)).join(' ');
};

export const keyCase = pipe([toString, trim, lowerCase, deburr, kebabCase]);

export const toAcronym = pipe([
    toString,
    trim,
    keyCase,
    str => str.split('-'),
    arr => arr.map(w => upperCase(w[0])),
    arr => arr.join(''),
]);

export const humanBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const thousands = number => new Intl.NumberFormat('en-US').format(number);

export const humanMinutes = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = `${Math.floor(seconds % 60)}`.padStart(2, '0');
    return `${mins}:${secs}`;
};

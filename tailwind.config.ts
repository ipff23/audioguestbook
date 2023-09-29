import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';
import animate from 'tailwindcss-animated';

const config: Config = {
    content: [
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    plugins: [nextui(), animate],
};
export default config;

'use client';
import useDarkMode from 'use-dark-mode';
import { Switch } from '@nextui-org/react';

import { MoonIcon } from '@/icons/MoonIcon';
import { SunIcon } from '@/icons/SunIcon';

export default function ThemeSwitcher() {
    const darkMode = useDarkMode(true);

    return (
        <div className='fixed bottom-8 right-4'>
            <Switch
                defaultSelected={darkMode.value}
                onValueChange={darkMode.toggle}
                size='lg'
                color='secondary'
                thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                        <SunIcon className={className} />
                    ) : (
                        <MoonIcon className={className} />
                    )
                }
            />
        </div>
    );
}

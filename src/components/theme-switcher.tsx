'use client';
import useDarkMode from 'use-dark-mode';
import { Switch } from '@nextui-org/switch';

import MoonFillIcon from '@/icons/moon-fill';
import SunFillIcon from '@/icons/sun-fill';

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
                        <SunFillIcon className={className} />
                    ) : (
                        <MoonFillIcon className={className} />
                    )
                }
            />
        </div>
    );
}

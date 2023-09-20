'use client';
import useDarkMode from 'use-dark-mode';
import { Switch } from '@nextui-org/switch';

import MoonFillIcon from '@/icons/MoonFillIcon';
import SunFillIcon from '@/icons/SunFillIcon';

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

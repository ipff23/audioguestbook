import ThemeSwitcher from '@/components/theme-switcher';

import { Button } from '@nextui-org/button';

import GithubLogoRegular from '@/icons/GithubLogoRegular';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-24 gap-24'>
            <Button
                color='primary'
                variant='bordered'
                size='lg'
                startContent={<GithubLogoRegular />}
            >
                Login with Github
            </Button>
            <ThemeSwitcher />
        </main>
    );
}

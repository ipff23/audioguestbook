import PublicContainer from '@/layout/public-container';
import Logo from '@/components/logo';
import ThemeSwitcher from '@/components/theme-switcher';

export default async function Home() {
    return (
        <PublicContainer>
            <Logo className='text-8xl' />
            <ThemeSwitcher />
        </PublicContainer>
    );
}

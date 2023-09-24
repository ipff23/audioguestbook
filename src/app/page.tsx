import Logo from '@/components/logo';
import PublicContainer from '@/components/public-container';
import ThemeSwitcher from '@/components/theme-switcher';

export default async function Home() {
    return (
        <PublicContainer>
            <Logo className='text-8xl' />
            <ThemeSwitcher />
        </PublicContainer>
    );
}

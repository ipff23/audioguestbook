import { getEnvironmentInfo } from '@/helpers/environment';

const environmentInfo = getEnvironmentInfo();

export default function Footer() {
    return (
        <footer className='fixed bottom-4 left-4 right-4 flex flex-row gap-2 justify-center text-sm text-white dark:text-white'>
            <span className='opacity-75'>v{environmentInfo.semver}</span>
            <span className='opacity-50'>#{environmentInfo['commit-short']}</span>
        </footer>
    );
}

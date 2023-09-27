import Link from 'next/link';

export interface FooterProps {
    semver: string;
    short: string;
}

export default function Footer({ semver, short }: FooterProps) {
    return (
        <footer className='fixed bottom-4 left-4 right-4 flex flex-row gap-2 justify-center text-sm text-slate-800 dark:text-white'>
            <span className='opacity-75'>v{semver}</span>
            <Link href={`https://github.com/dannegm/audioguestbook/tree/${short}`}>
                <span className='opacity-50'>#{short}</span>
            </Link>
        </footer>
    );
}

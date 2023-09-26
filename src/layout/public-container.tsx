import { type ChildrenContainer } from '@/types/common';

export default function PublicContainer({ children }: ChildrenContainer) {
    return (
        <main className='bg-cover bg-center bg-[url("/img/background.jpg")] flex flex-col min-h-screen'>
            <div className='backdrop-blur-lg bg-slate-950/50 flex min-h-screen flex-col items-center justify-center'>
                {children}
            </div>
        </main>
    );
}

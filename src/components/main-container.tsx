import { type ChildrenContainer } from '@/types/common';

export default function MainContainer({ children }: ChildrenContainer) {
    return (
        <main className='text-foreground bg-background bg-cover bg-center bg-[url("/img/background.jpg")] flex flex-col min-h-screen'>
            <div className='backdrop-blur-lg bg-slate-200/80 dark:bg-slate-950/90 flex min-h-screen flex-col items-center'>
                <div className='w-[42rem] p-6 flex flex-col gap-4'>{children}</div>
            </div>
        </main>
    );
}

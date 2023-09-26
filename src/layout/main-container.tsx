import { cn } from '@/helpers/utils';
import { type ChildrenContainer } from '@/types/common';

interface MainContainerProps extends ChildrenContainer {
    className?: string;
    overlayClassName?: string;
    backgroundClassName?: string;
    background?: string;
}

export default function MainContainer({
    className,
    overlayClassName,
    backgroundClassName,
    background,
    children,
}: MainContainerProps) {
    const backgroundImage = background ?? '/img/background.jpg';
    return (
        <main
            className={cn(
                'bg-slate-200 dark:bg-slate-950 bg-cover bg-center flex flex-col min-h-screen',
                backgroundClassName,
            )}
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div
                className={cn(
                    'backdrop-blur-2xl bg-slate-200/80 dark:bg-slate-950/90 flex min-h-screen flex-col items-center',
                    overlayClassName,
                )}
            >
                <div className={cn('w-[42rem] p-6 flex flex-col gap-4', className)}>{children}</div>
            </div>
        </main>
    );
}

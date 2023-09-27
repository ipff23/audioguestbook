import { cn } from '@/helpers/utils';
import { type ChildrenContainer } from '@/types/common';

interface MainContainerClassNames {
    background?: string;
    overlay?: string;
    container?: string;
}
export interface MainContainerProps extends ChildrenContainer {
    classNames?: MainContainerClassNames;
    background?: string;
}

export default function MainContainer({ classNames, background, children }: MainContainerProps) {
    const backgroundImage = background ?? '/img/background.jpg';
    return (
        <main
            className={cn(
                'bg-slate-200 dark:bg-slate-950 bg-cover bg-center flex flex-col min-h-screen',
                classNames?.background,
            )}
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div
                className={cn(
                    'backdrop-blur-2xl bg-slate-200/80 dark:bg-slate-950/90 flex min-h-screen flex-col items-center',
                    classNames?.overlay,
                )}
            >
                <div className={cn('w-[42rem] p-6 flex flex-col gap-4', classNames?.container)}>
                    {children}
                </div>
            </div>
        </main>
    );
}

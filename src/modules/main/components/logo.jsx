import { cn } from '@/modules/core/helpers/utils';

export const Logo = ({ className, children = 'Guestbook' }) => {
    return (
        <h1 className={cn('text-xl font-barlow font-bold italic uppercase', className)}>
            {children}
        </h1>
    );
};

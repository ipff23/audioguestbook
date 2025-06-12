import { cn } from '@/modules/core/helpers/utils';

export const BadgeIndicator = ({ className, color = 'red', visible, children }) => {
    return (
        <div className={cn('relative', className)}>
            <div
                className={cn(
                    'hidden absolute top-0 right-0 size-3 bg-(--indicator-color) ring-2 ring-white dark:ring-gray-800 rounded-full',
                    {
                        block: visible,
                    },
                )}
                style={{
                    '--indicator-color': `var(--color-${color}-500)`,
                }}
            />
            {children}
        </div>
    );
};

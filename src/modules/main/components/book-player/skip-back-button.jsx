import { SkipBack } from '@/modules/core/components/icons';
import { Button } from '@/modules/shadcn/ui/button';

export const SkipBackButton = ({ onClick }) => {
    return (
        <Button
            className="size-12 bg-transparent hover:bg-foreground/10 text-foreground/80 rounded-full [&_svg:not([class*='size-'])]:size-5"
            size='icon'
            onClick={onClick}
        >
            <SkipBack />
        </Button>
    );
};

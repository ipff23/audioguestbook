import { SkipForward } from '@/modules/core/components/icons';
import { Button } from '@/modules/shadcn/ui/button';

export const SkipFowardButton = ({ onClick }) => {
    return (
        <Button
            className="size-12 bg-transparent hover:bg-foreground/10 text-foreground/80 rounded-full [&_svg:not([class*='size-'])]:size-5"
            size='icon'
            onClick={onClick}
        >
            <SkipForward />
        </Button>
    );
};

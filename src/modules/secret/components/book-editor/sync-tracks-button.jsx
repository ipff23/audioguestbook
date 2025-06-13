import { Button } from '@/modules/shadcn/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncTracksMutation } from '../../actions/track-actions';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/modules/core/helpers/utils';

export const SyncTracksButton = ({ className, bookId }) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation(
        syncTracksMutation({
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['tracks'] });
                window.location.reload();
            },
        }),
    );

    if (isPending) {
        return (
            <Button
                variant='secondary'
                className={cn('bg-blue-500 hover:bg-blue-700 text-white', className)}
                disabled
            >
                <RefreshCw className='animate-spin' /> Sincronizando...
            </Button>
        );
    }

    return (
        <Button
            variant='secondary'
            className={cn('bg-blue-500 hover:bg-blue-700 text-white', className)}
            onClick={() => mutate({ bookId })}
        >
            <RefreshCw /> Sincronizar Tracks
        </Button>
    );
};

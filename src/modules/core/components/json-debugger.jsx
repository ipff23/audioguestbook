import { cn } from '@/modules/core/helpers/utils';
import { useSettings } from '@/modules/core/hooks/use-settings';

import { JsonViewer } from '@/modules/core/components/json-viewer';

export const JsonDebugger = ({ className, name = 'root', data = {}, expanded }) => {
    const [debug] = useSettings('settings:debug', false);

    if (!debug) return null;

    return (
        <div className={cn(className)}>
            <JsonViewer name={name} data={data} expanded={expanded} />
        </div>
    );
};

import { cn } from '@/modules/core/helpers/utils';
import { useDarkMode } from '@/modules/core/hooks/use-dark-mode';
import { useDocumentClassNames } from '@/modules/core/hooks/use-document-class-names';

export const DarkModeProvider = ({ children }) => {
    const [theme] = useDarkMode();

    useDocumentClassNames({
        body: cn(theme),
    });

    return <>{children}</>;
};

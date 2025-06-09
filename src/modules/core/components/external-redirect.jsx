import { useEffect } from 'react';

export const ExternalRedirect = ({ to, replace = false }) => {
    useEffect(() => {
        if (replace) {
            window.location.replace(to);
        } else {
            window.location.href = to;
        }
    }, [to, replace]);

    return null;
};

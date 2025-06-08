import { useEffect } from 'react';

export const useDocumentClassNames = ({ root = '', body = '' } = {}) => {
    useEffect(() => {
        root &&
            root.split(' ').forEach(className => {
                document.documentElement.classList.add(className);
            });
        body &&
            body.split(' ').forEach(className => {
                document.body.classList.add(className);
            });

        return () => {
            root &&
                root.split(' ').forEach(className => {
                    document.documentElement.classList.remove(className);
                });
            body &&
                body.split(' ').forEach(className => {
                    document.body.classList.remove(className);
                });
        };
    }, [root, body]);
};

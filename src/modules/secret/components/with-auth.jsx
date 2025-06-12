import { Redirect } from 'wouter';
import { useAuth } from '@/modules/secret/hooks/use-auth';

export const WithAuth = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <></>;
    }

    if (!user) {
        return <Redirect to='/secret/login' />;
    }

    return children;
};

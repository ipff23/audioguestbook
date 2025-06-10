import { Redirect } from 'wouter';
import { useAuth } from '@/modules/secret/hooks/use-auth';
import { Loader } from '@/modules/core/components/loader';

export const WithAuth = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Redirect to='/secret/login' />;
    }

    return children;
};

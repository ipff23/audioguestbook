import { Redirect, useLocation } from 'wouter';
import { useAuth } from '@/modules/secret/hooks/use-auth';

export const WithAuth = ({ children }) => {
    const [, navigate] = useLocation();
    const { user, loading } = useAuth({
        onLogout: () => navigate('/secret/login'),
    });

    if (loading) {
        return <></>;
    }

    if (!user) {
        return <Redirect to='/secret/login' />;
    }

    return children;
};

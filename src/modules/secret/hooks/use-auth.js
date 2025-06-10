import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/modules/services/firebase';
import { readUser } from '@/modules/secret/actions/user-read-mutation';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async user => {
            const userData = await readUser(user);
            setUser(userData);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { user, loading };
};

import { type SupabaseClient } from '@supabase/auth-helpers-nextjs';

export const getSessionUser = async (supabase: SupabaseClient) => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', session?.user?.id)
        .single();

    return data;
};

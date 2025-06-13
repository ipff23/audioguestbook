import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const supabaseSchema = z.object({
    url: z.string(),
    key: z.string(),
});

const supabaseConfig = supabaseSchema.parse({
    url: import.meta.env.PUBLIC_SUPABASE_URL,
    key: import.meta.env.PUBLIC_SUPABASE_KEY,
});

export const supabase = createClient(supabaseConfig.url, supabaseConfig.key);

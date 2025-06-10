import { z } from 'zod';
import umami from '@umami/node';

export const umamiShareUrl = import.meta.env.PUBLIC_UMAMI_SHARE_URL || '#';

const umamiConfigSchema = z.object({
    websiteId: z.string(),
    hostUrl: z.string(),
});

const umamiConfig = umamiConfigSchema.parse({
    websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID,
    hostUrl: import.meta.env.PUBLIC_UMAMI_WEBSITE_HOST_URL,
});

umami.init(umamiConfig);

export { umami };

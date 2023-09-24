const host = process.env.NEXT_PUBLIC_LOG_HOST;

export const $log = async (content: any, level: 'log' | 'info' | 'warn' | 'error' = 'log') => {
    await fetch(`${host}/api/logger`, {
        method: 'POST',
        body: JSON.stringify({
            content,
            level,
        }),
    });
};

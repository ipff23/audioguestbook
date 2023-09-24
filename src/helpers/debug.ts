const host = process.env.NEXT_PUBLIC_LOG_HOST;

interface Log {
    namespace?: string;
    level?: 'log' | 'info' | 'warn' | 'error';
    content: any;
}

export const $log = async ({ namespace, content, level }: Log) => {
    await fetch(`${host}/api/logger`, {
        method: 'POST',
        body: JSON.stringify({
            level: level ?? 'log',
            namespace: namespace ?? 'none',
            content,
        }),
    });
};

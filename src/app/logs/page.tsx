const host = process.env.NEXT_PUBLIC_LOG_HOST;

const getLogs = async () => {
    const res = await fetch(`${host}/api/logger`);
    const body = await res.json();
    return body.data.content;
};

interface Log {
    namespace?: string;
    content: any;
    date: string;
    level: 'log' | 'info' | 'warn' | 'error';
}

export default async function Logs() {
    const logs = await getLogs();
    return (
        <div>
            {logs.map(({ namespace, content, date, level }: Log) => (
                <pre key={date}>{`${date} (${level}) [${namespace}]: ${content}\n`}</pre>
            ))}
        </div>
    );
}

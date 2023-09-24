import { JsonDB, Config } from 'node-json-db';
import { compareDesc } from 'date-fns';
import type { NextRequest } from 'next/server';

interface JsonResponse {
    status: number;
    data: any;
}

const jsonResponse = ({ status, data }: JsonResponse) => {
    return new Response(JSON.stringify({ data }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
};

interface Log {
    namespace?: string;
    content: any;
    date: Date;
    level: 'log' | 'info' | 'warn' | 'error';
}

const db = new JsonDB(new Config('logsDB', true, false, '/'));

export async function POST(request: Request) {
    const { namespace, content, level } = await request.json();

    const log = {
        namespace: namespace ?? 'none',
        content: JSON.stringify(content),
        level,
        date: new Date(),
    };

    await db.push('/logs[]', log, true);

    return jsonResponse({
        status: 201,
        data: log,
    });
}

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams;

    const level = query.get('limit') ?? 'all';
    const namespace = query.get('limit') ?? 'none';
    const limit = Number(query.get('limit') ?? 50);
    const offset = Number(query.get('offset') ?? 0);

    const logsData = await db.getData('/logs');

    const filteredByLevelData =
        level === 'all' ? logsData : logsData.filter((log: Log) => log.level === level);

    const filteredByNamespaceData =
        namespace === 'none'
            ? filteredByLevelData
            : filteredByLevelData.filter((log: Log) => log.namespace === namespace);

    const sortedData = filteredByNamespaceData.sort((a: Log, b: Log) => {
        return compareDesc(a.date, b.date);
    });

    const splicedData = [...sortedData].splice(offset, limit);

    return jsonResponse({
        status: 200,
        data: {
            total: sortedData.length,
            count: splicedData.length,
            content: splicedData,
        },
    });
}

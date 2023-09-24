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
    content: any;
    date: Date;
    level: 'log' | 'info' | 'warn' | 'error';
}

const logsData: Log[] = [];

export async function POST(request: Request) {
    const { content, level } = await request.json();

    const log = {
        content,
        level,
        date: new Date(),
    };

    logsData.push(log);

    return jsonResponse({
        status: 201,
        data: log,
    });
}

export function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams;

    const level = query.get('limit') ?? 'all';
    const limit = Number(query.get('limit') ?? 50);
    const offset = Number(query.get('offset') ?? 0);

    const filteredData = level === 'all' ? logsData : logsData.filter(log => log.level === level);

    const sortedData = filteredData.sort((a, b) => {
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

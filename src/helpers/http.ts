export interface JsonResponse {
    status: number;
    data: any;
}

export const jsonResponse = ({ status, data }: JsonResponse): Response => {
    return new Response(JSON.stringify({ data }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const requestHandler = async (handler: (...args: any[]) => any) => {
    try {
        await handler();
    } catch (error) {
        console.error(error);
        return jsonResponse({
            status: 400,
            data: { error },
        });
    }
};

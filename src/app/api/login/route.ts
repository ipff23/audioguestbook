import { readUserByToken, storeSession } from '@/services/auth';
// import { createUser } from '@/services/users';

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

export async function POST(request: Request) {
    try {
        const { idToken } = await request.json();
        const user = await readUserByToken({ idToken });
        // const createdUser = await createUser({ uid: user?.uid ?? '' });

        storeSession({ idToken });

        return jsonResponse({
            status: 200,
            data: {
                user,
            },
        });
    } catch (error) {
        console.error(error);

        return jsonResponse({
            status: 401,
            data: {
                error,
            },
        });
    }
}

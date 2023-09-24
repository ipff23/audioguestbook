import { $log } from '@/helpers/debug';
import { readUserByToken, storeSession } from '@/services/auth';
import { createUser } from '@/services/users';

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
    $log({ namespace: 'Login', content: 'cerrando sesion' });
    try {
        const { idToken } = await request.json();
        $log({ namespace: 'Login/idToken', content: idToken });

        const user = await readUserByToken({ idToken });
        $log({ namespace: 'Login/user', content: user });

        const createdUser = await createUser({ uid: user?.uid ?? '' });
        $log({ namespace: 'Login/createdUser', content: createdUser });

        storeSession({ idToken });

        return jsonResponse({
            status: 200,
            data: {
                user: createdUser,
            },
        });
    } catch (error) {
        $log({ namespace: 'Login', content: error, level: 'error' });
        console.error(error);

        return jsonResponse({
            status: 401,
            data: {
                error,
            },
        });
    }
}

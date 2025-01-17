import { handleCreateUser } from "@/app/actions/auth";
import { generateSecurePassword } from "@/lib/utils";


export async function POST(req: Request) {
    const { first_name, last_name, email, identification, phone } = await req.json();

    const password = await generateSecurePassword(8);

    if (!email || !password) {
        return new Response('Email and password are required', { status: 400 });
    }

    const userData = {
        first_name,
        last_name,
        email,
        password,
        identification,
        phone
    }

    try {
        const data = await handleCreateUser(userData);
        if (!data.success) {
            return new Response(data.message, { status: 400 });
        }
        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}
import { getUserById } from "@/app/actions/getUsers";


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

     if (!id) {
         return new Response('User ID is required', { status: 400 });
    }

    try {
        const data = await getUserById(id);
        if (!data.success) {
            return new Response('User not found', { status: 404 });
        }
        return new Response(JSON.stringify(data.user), { status: 200 });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}
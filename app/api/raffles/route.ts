import { handleCreateRaffle } from "@/app/actions/getRaffles";

export async function POST(req: Request) {
    const { 
        nombre,
        descripcion,
        fecha_sorteo,
        precio_ticket,
        cantidad_tickets,
     } = await req.json();


    if (!nombre || !descripcion || !fecha_sorteo || !precio_ticket || !cantidad_tickets) {
        return new Response('Email and password are required', { status: 400 });
    }

    const raffleData = {
        nombre,
        descripcion,
        fecha_sorteo,
        precio_ticket,
        cantidad_tickets
    }

    try {
        const data = await handleCreateRaffle(raffleData);
        if (!data.success) {
            return new Response(data.message, { status: 400 });
        }
        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}
import { getRSVPs } from "@/app/actions/getRSVPs";

import { Button } from "@/components/ui/button";
import { RSVPTable } from "@/app/_components/RSVPTable";
import { House } from "lucide-react";
import Link from "next/link";
import { UsersTable } from "@/app/_components/UsersTable";
import { getUser, getUsers } from "@/app/actions/getUsers";
import { createClient } from "@/app/utils/supabase/server";
import { NavUser } from "@/app/_components/NavUser";
import { getMyTickets } from "@/app/actions/getTickets";
import { TicketsTable } from "@/app/_components/TicketsTable";
import { Separator } from "@/components/ui/separator";

export default async function PerfilPage() {
    const { success, user } = await getUser();

    if (!success) {
         return <div className="container mx-auto mt-8 p-4">Error: </div>;
    }

    const { tickets } = await getMyTickets(user.id)

    const data = {
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        avatar: ""
    }

    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Bienvenido {user.first_name} {user.last_name}</h1>
                <div className="flex items-center gap-2">
                <Link href="/">
                    <Button variant="outline">
                    <House />
                    </Button>
                </Link>
                <NavUser userNav={data} />
                </div>
            </div>

        <h2 className="text-xl mt-10">Historial de Tickets</h2>
        <TicketsTable data={tickets || []} />
        </div>
    );
}

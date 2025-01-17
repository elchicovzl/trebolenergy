import { getRSVPs } from "@/app/actions/getRSVPs";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { RSVPTable } from "@/app/_components/RSVPTable";
import { House, Ticket, Gift, CircleDollarSign, User } from "lucide-react";
import Link from "next/link";
import { UsersTable } from "@/app/_components/UsersTable";
import { getUser, getUsers } from "@/app/actions/getUsers";
import { createClient } from "@/app/utils/supabase/server";
import { NavUser } from "@/app/_components/NavUser";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import UsersSheet from "@/app/_components/Sheet/UsersSheet";

export default async function UsersPage() {
    const { success, users, message } = await getUsers();

    if (!success) {
         return <div className="container mx-auto mt-8 p-4">Error: {message}</div>;
    }

    const {user} = await getUser();

    const data = {
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        avatar: ""
    }

    return (
        <div className="container mx-auto mt-8 p-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trebol de la Energia</h2>
            <h2 className="text-2xl font-bold flex items-center"><User className="mr-2" /> Usuarios</h2>
            <div className="flex items-center gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link className="rounded-md hover:text-red-400" href="/">
                            <House />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Inicio</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link className="rounded-md hover:text-red-400" href="/admin/users">
                            <User />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Usuarios</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link className="rounded-sm hover:text-red-400" href="/admin/rifas">
                            <Gift />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Rifas</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link className="rounded-sm hover:text-red-400" href="/">
                            <CircleDollarSign />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Pagos</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <NavUser userNav={data} />
            </div>
        </div>

        <UsersTable data={users || []} />

        <UsersSheet />
        </div>
    );
}

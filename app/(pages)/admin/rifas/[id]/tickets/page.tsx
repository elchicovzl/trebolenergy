import { getTickets } from "@/app/actions/getTickets";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, Gift, House, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getRaffles } from "@/app/actions/getRaffles";
import { TicketsTable } from "@/app/_components/TicketsTable";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NavUser } from "@/app/_components/NavUser";
import { getUser } from "@/app/actions/getUsers";

type Args = {
    params: Promise<{
      id?: string
    }>
}

export default async function RifasPage({ params: paramsPromise }: Args) {

    const { id } = await paramsPromise
    const {raffles, success:successRaffles} = await getRaffles(id); // Assuming you have a function to get all raffles

    if (!successRaffles || !raffles) {
        return redirect('/404');
    }

    const { success, tickets, message } = await getTickets(raffles[0]?.id);

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
        <h2 className="text-2xl font-bold flex items-center"><Gift className="mr-2" />{raffles[0].nombre} - Tickets</h2>
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

        <TicketsTable data={tickets || []} />
        </div>
    );
}

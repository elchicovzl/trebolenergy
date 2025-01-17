import { getRaffles } from "@/app/actions/getRaffles";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { RafflesTable } from "@/app/_components/RafflesTable";
import { CircleDollarSign, Gift, House, User } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NavUser } from "@/app/_components/NavUser";
import { getUser } from "@/app/actions/getUsers";

export default async function RifasPage() {

    const { success, raffles, message } = await getRaffles();

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
        <h2 className="text-2xl font-bold flex items-center"><Gift className="mr-2" /> Rifas</h2>
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

        <RafflesTable data={raffles || []} />
        </div>
    );
}

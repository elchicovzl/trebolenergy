import { getRSVPs } from "@/app/actions/getRSVPs";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { RSVPTable } from "@/app/_components/RSVPTable";
import { House } from "lucide-react";
import Link from "next/link";
import { UsersTable } from "@/app/_components/UsersTable";
import { getUsers } from "@/app/actions/getUsers";

export default async function RSVPsPage() {         
    const { success, data, message } = await getRSVPs();    
    const { success: userSuccess, users, message: userMessage } = await getUsers();

    if (!success) {
        return <div className="container mx-auto mt-8 p-4">Error: {message}</div>;
    }



    return (
        <div className="container mx-auto mt-8 p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All RSVPs</h1>
            <div className="flex items-center gap-2">
            <Link href="/">
                <Button variant="outline">
                <House />
                </Button>
            </Link>
            <form action={signOut}>
                <Button variant="outline" type="submit">
                Sign Out
                </Button>
            </form>
            </div>
        </div>

        <RSVPTable data={data || []} />
        <UsersTable data={users || []} />
        </div>
    );
}

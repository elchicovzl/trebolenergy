"use server";

import { createClient } from "../utils/supabase/server";

export async function getTickets(id:string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tickets")
        .select("*, raffles(*), profiles(*)")
        .eq("rifa_id", id);

    console.log(data)


    if (error) {
        console.error("Error fetching Tickets:", error);
        return { success: false, message: "Failed to fetch Tickets" };
    }

    return { success: true, tickets:data };

}

export async function getMyTickets(id:string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tickets")
        .select("*, raffles(*), profiles(*)")
        .eq("usuario_id", id);

    if (error) {
        console.error("Error fetching Ticket:", error);
        return { success: false, message: "Failed to fetch Ticket" };
    }

    return { success: true, tickets:data };
}
"use server";

import { createAdminClient, createClient } from "../utils/supabase/server";

export async function getRaffles(id?: string) {
    const supabase = await createClient();

    let query = supabase.from("raffles").select("*");

    if (id) {
        query = query.eq("id", id);
    }

    const { data, error } = await query;

    if (error || data.length == 0) {
        console.error("Error fetching Raffles:", error);
        return { success: false, message: "Failed to fetch Raffles" };
    }

    return { success: true, raffles: data };
}

export async function handleCreateRaffle(raffleData: any) {
    const supabase = await createAdminClient();

    const { data, error } = await supabase.from("raffles").insert([raffleData]);

    if (error) {
        console.log(error);
        return { error: error.message, success: false };
    }

    return { success: true, message: "Raffle Created successfully" };
}

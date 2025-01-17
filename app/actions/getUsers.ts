"use server";

import { createClient } from "../utils/supabase/server";
import { handleCreateUser } from "./auth";

export async function getUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching Users:", error);
    return { success: false, message: "Failed to fetch Users" };
  }

  return { success: true, users:data };
}

export async function getUser() {
    const supabase = await createClient();

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user?.id).single();
    
    
    
    return { success: true, user:profile };
}

export async function getUserById(id:string) {
    const supabase = await createClient();

    const { data, error } = await supabase.from("profiles").select("*").eq("id", id);

    if (error) {
        console.error("Error fetching Users:", error);
        return { success: false, message: "Failed to fetch Users" };
    }

    return { success: true, user:data[0] };
}
"use server";

import { supabaseAdmin } from "../lib/supabase-admin";

export async function getRSVPs() {
  // Use the admin client for owner operations
  const { data, error } = await supabaseAdmin.from("rsvps").select("*");

  if (error) {
    console.error("Error fetching RSVPs:", error);
    return { success: false, message: "Failed to fetch RSVPs" };
  }

  return { success: true, data };
}

"use server";

import { redirect } from "next/navigation";
import { createAdminClient, createClient } from "../utils/supabase/server";
import { UserData } from "@/types";

export async function signIn(
  prevState: { error: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data, "data_login");

  if (error) {
    return { error: error.message };
  }

  const {data:profile} = await supabase.from("profiles").select("*").single();

  if (profile?.role == "admin") {
    redirect("/admin/rsvps");
  }else {
    redirect("/");
  }

}

export const handleCreateUser = async (userData:UserData) => {
    const supabase = await createAdminClient();

    console.log("creando usuario nuevo metodo");
    const { data, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        user_metadata: {
              first_name: userData.first_name,
              last_name: userData.last_name,
              identification: userData.identification,
              phone: userData.phone,
          },
    });

    if (error) {
        console.log(error);
        return { error: error.message, success: false };
    }

    return { success: true, message: "User Created successfully" }
};

export const handleCreateUserSignUp = async (userData:UserData) => {
    const supabase = await createClient();

    console.log("creando usuario");
    const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
            data: {
              first_name: userData.first_name,
              last_name: userData.last_name,
              identification: userData.identification,
              phone: userData.phone,
            },
          },
    });

    if (error) {
        return { error: error.message, success: false };
    }

    return { success: true, message: "User Created successfully" }
};

export async function signOut() {
  "use server";

  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}

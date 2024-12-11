"use server";

import { createClient } from "../utils/supabase/server";

// import { Resend } from "resend";
// import { strings } from "../lib/strings";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitRSVP(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name");
  const email = formData.get("email");
  const accompany = formData.get("accompany");
  const attendance = formData.get("attendance");

  const { data, error } = await supabase
    .from("rsvps")
    .insert([{ name, email, accompany, attendance }]);
  console.log(data, "data_submitRSVP");

  if (error) {
    console.error("Error inserting RSVP:", error);
    return { success: false, message: "Failed to submit RSVP", error };
  }

  // Send email notification
  // try {
  //   await resend.emails.send({
  //     from: "RSVP <onboarding@resend.dev>",
  //     to: "your-email@example.com", // Replace with the event organizer's email
  //     subject: "New RSVP Submission",
  //     html: `
  //       <h1>New RSVP Submission</h1>
  //       <p><strong>Name:</strong> ${name}</p>
  //       <p><strong>Email:</strong> ${email}</p>
  //       <p><strong>Number of Guests:</strong> ${accompany}</p>
  //       <p><strong>Attendance:</strong> ${attendance}</p>
  //       <p><strong>Event Date:</strong> ${new Date(strings.eventDate).toLocaleDateString()}</p>
  //     `,
  //   });
  // } catch (error) {
  //   console.error("Error sending email:", error);
  //   // Note: We don't return an error here because the RSVP was still stored successfully
  // }

  return { success: true, message: "RSVP submitted successfully" };
}

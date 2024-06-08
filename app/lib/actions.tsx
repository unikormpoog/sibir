"use server";
import { AuthError } from "next-auth";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { signIn } from "@/auth";

export async function deleteProf(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM profs WHERE id = ${id}`;
    revalidatePath("/dashboard/profs");
    return { message: "Профессор удален." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

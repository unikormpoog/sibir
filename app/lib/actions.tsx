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

const FormSchema = z.object({
  name: z.string(),
  department: z.string(),
  position: z.string(),
  degree: z.string(),
  address: z.string(),
  phone: z.coerce.number(),
  tabel_id: z.coerce.number(),
  wage: z.coerce.number(),
  start_date: z.string(),
});
const FormSchema2 = z.object({
  id: z.string(),
  name: z.string(),
  department: z.string(),
  position: z.string(),
  degree: z.string(),
  address: z.string(),
  phone: z.coerce.number(),
  tabel_id: z.coerce.number(),
  wage: z.coerce.number(),
  start_date: z.string(),
});

export async function createProf(formData: FormData) {
  const {
    name,
    department,
    position,
    degree,
    address,
    phone,
    tabel_id,
    wage,
    start_date,
  } = FormSchema.parse({
    name: formData.get("name"),
    department: formData.get("department"),
    position: formData.get("position"),
    degree: formData.get("degree"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    tabel_id: formData.get("tabel_id"),
    wage: formData.get("wage"),
    start_date: formData.get("start_date"),
  });
  console.log(formData); // Debugging FormData
  console.log({
    name,
    department,
    position,
    degree,
    address,
    phone,
    tabel_id,
    wage,
    start_date,
  }); // Debugging parsed data
  try {
    await sql`
    INSERT INTO profs (name, department, position, degree, address, phone, tabel_id, wage, start_date) VALUES
    (

    ${name},
    ${department},
    ${position},
    ${degree},
    ${address},
    ${phone},
    ${tabel_id},
    ${wage},
    ${start_date}
    )`;
    console.log("Database Insertion Successful");
    console.log(sql);
  } catch (error) {
    console.error("Database Error: Failed to Create Prof.", error); // Log database error
    return {
      message: "Database Error: Failed to Create Prof.",
    };
  }
  revalidatePath("/dashboard/profs");
  redirect("/dashboard/profs");
}

const UpdateProf = FormSchema2.omit({
  id: true,
  // name: true,
  // department: true,
  // position: true,
  // degree: true,
  // address: true,
  // phone: true,
  // tabel_id: true,
  // wage: true,
  // start_date: true,
});

export async function updateProf(id: string, formData: FormData) {
  const {
    name,
    department,
    position,
    degree,
    address,
    phone,
    tabel_id,
    wage,
    start_date,
  } = UpdateProf.parse({
    name: formData.get("name"),
    department: formData.get("department"),
    position: formData.get("position"),
    degree: formData.get("degree"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    tabel_id: formData.get("tabel_id"),
    wage: formData.get("wage"),
    start_date: formData.get("start_date"),
  });
  console.log("UpdateProf " + UpdateProf, name, department, position);

  try {
    await sql`
      UPDATE profs 
      SET 
      name = ${name},
      department = ${department},
      position = ${position},
      degree = ${degree},
      address = ${address},
      phone = ${phone},
      tabel_id = ${tabel_id},
      wage = ${wage},
      start_date = ${start_date}
      WHERE id = ${id}
    `;
    console.log("sql " + sql);
  } catch (error) {
    return { message: "Database Error: Failed to Update Prof.", error };
  }
  revalidatePath("/dashboard/profs");
  redirect("/dashboard/profs");
}
//
//
//
//
//
//
//
//
//
//
//
//
export async function deleteProfNew(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM profs WHERE id = ${id}`;
    revalidatePath("/dashboard/profs");
    return { message: "Профессор удален." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

const FormSchemaNew = z.object({
  name: z.string(),
  department_id: z.string(),
  position: z.string(),
  degree: z.string(),
  address: z.string(),
  phone: z.coerce.number(),
  tabel_id: z.coerce.number(),
  wage: z.coerce.number(),
  start_date: z.string(),
});
const FormSchemaNewDeps = z.object({
  id: z.string(),
  department: z.string(),
  head: z.string(),
  address: z.string(),
  phone: z.coerce.number(),
});

export async function createProfNew(formData: FormData) {
  const {
    name,
    department_id,
    position,
    degree,
    address,
    phone,
    tabel_id,
    wage,
    start_date,
  } = FormSchemaNew.parse({
    name: formData.get("name"),
    department_id: formData.get("department"),
    position: formData.get("position"),
    degree: formData.get("degree"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    tabel_id: formData.get("tabel_id"),
    wage: formData.get("wage"),
    start_date: formData.get("start_date"),
  });
  console.log(formData); // Debugging FormData
  console.log({
    name,
    department_id,
    position,
    degree,
    address,
    phone,
    tabel_id,
    wage,
    start_date,
  }); // Debugging parsed data
  try {
    await sql`
    INSERT INTO profs (name, department, position, degree, address, phone, tabel_id, wage, start_date) VALUES
    (

    ${name},
    ${department_id},
    ${position},
    ${degree},
    ${address},
    ${phone},
    ${tabel_id},
    ${wage},
    ${start_date}
    )`;
    console.log("Database Insertion Successful");
    console.log(sql);
  } catch (error) {
    console.error("Database Error: Failed to Create Prof.", error); // Log database error
    return {
      message: "Database Error: Failed to Create Prof.",
    };
  }
  revalidatePath("/dashboard/profs");
  redirect("/dashboard/profs");
}

const UpdateProfNew = FormSchema2.omit({
  id: true,
  // name: true,
  // department: true,
  // position: true,
  // degree: true,
  // address: true,
  // phone: true,
  // tabel_id: true,
  // wage: true,
  // start_date: true,
});

export async function updateProfNew(id: string, formData: FormData) {
  const {
    name,
    department,
    position,
    degree,
    address,
    phone,
    tabel_id,
    wage,
    start_date,
  } = UpdateProf.parse({
    name: formData.get("name"),
    department: formData.get("department"),
    position: formData.get("position"),
    degree: formData.get("degree"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    tabel_id: formData.get("tabel_id"),
    wage: formData.get("wage"),
    start_date: formData.get("start_date"),
  });
  console.log("UpdateProf " + UpdateProf, name, department, position);

  try {
    await sql`
      UPDATE profs 
      SET 
      name = ${name},
      department = ${department},
      position = ${position},
      degree = ${degree},
      address = ${address},
      phone = ${phone},
      tabel_id = ${tabel_id},
      wage = ${wage},
      start_date = ${start_date}
      WHERE id = ${id}
    `;
    console.log("sql " + sql);
  } catch (error) {
    return { message: "Database Error: Failed to Update Prof.", error };
  }
  revalidatePath("/dashboard/profs");
  redirect("/dashboard/profs");
}

export async function createDepNew(formData: FormData) {
  const { department, head, address, phone } = FormSchemaNewDeps.parse({
    head: formData.get("head"),
    department: formData.get("department"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  });
  console.log(formData); // Debugging FormData
  console.log({
    department,
    head,
    address,
    phone,
  }); // Debugging parsed data
  try {
    await sql`
    INSERT INTO profs (department, head, address, phone) VALUES
    (

    ${department},
    ${head},
    ${address},
    ${phone},
   
    )`;
    console.log("Database Insertion Successful");
    console.log(sql);
  } catch (error) {
    console.error("Database Error: Failed to Create Dep.", error); // Log database error
    return {
      message: "Database Error: Failed to Create Dep.",
    };
  }
  revalidatePath("/dashboard/deps");
  redirect("/dashboard/deps");
}

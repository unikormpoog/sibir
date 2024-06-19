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

export async function deleteDep(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM departments WHERE id = ${id}`;
    revalidatePath("/dashboard/deps");
    return { message: "Кафедра удалена." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}
export async function deletePay(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM professors_payment WHERE id = ${id}`;
    revalidatePath("/dashboard/paychecks");
    return { message: "Запись удалена." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Paycheks." };
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

const FormSchema_Dep = z.object({
  department_name: z.string(),
  head: z.string(),
  address: z.string(),
  phone: z.coerce.number(),
});
const FormSchema2_Dep_Upd = z.object({
  id: z.string(),
  department_name: z.string(),
  head: z.string(),
  address: z.string(),
  phone: z.coerce.number(),
});

export async function createDep(formData: FormData) {
  const { department_name, head, address, phone } = FormSchema_Dep.parse({
    department_name: formData.get("department_name"),
    head: formData.get("head"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  });
  console.log("ФОРМ ДАТА  " + formData); // Debugging FormData
  console.log(
    "ЫВЫВЫЫ" +
      {
        department_name,
        head,
        address,
        phone,
      }
  ); // Debugging parsed data
  try {
    await sql`
    INSERT INTO departments (department_name, head, address, phone) VALUES
    (

    ${department_name},
    ${head},
    ${address},
    ${phone}
  
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

const FormSchema_Pay = z.object({
  id: z.string().optional(),
  name: z.string(),
  department: z.string(),
  status: z.string(),
  date_of_paycheck: z.string(),
  payment_month: z.string(),
  amount: z.coerce.number(),
});

const createPay = FormSchema_Pay.omit({ id: true });

export async function createPaycheck(formData: FormData) {
  const { name, department, date_of_paycheck, status, amount, payment_month } =
    createPay.parse({
      name: formData.get("name"),
      department: formData.get("department"),
      date_of_paycheck: formData.get("date_of_paycheck"),
      status: formData.get("status"),
      amount: formData.get("amount"),
      payment_month: formData.get("payment_month"),
    });
  console.log("ФОРМ ДАТА  " + formData); // Debugging FormData
  console.log(
    "ЫВЫВЫЫ" +
      {
        name,
        department,
        date_of_paycheck,
        status,
        amount,
        payment_month,
      }
  );
  try {
    await sql`
    INSERT INTO professors_payment (name, department, date_of_paycheck, status,amount,payment_month) VALUES
    (

    ${name},
    ${department},
    ${date_of_paycheck},
    ${status},
    ${amount},
    ${payment_month}
   

  
    )`;
    console.log("Database Insertion Successful");
    console.log(sql);
  } catch (error) {
    console.error("Database Error: Failed to Create Dep.", error);
    return {
      message: "Database Error: Failed to Create Dep.",
    };
  }
  revalidatePath("/dashboard/paychecks");
  redirect("/dashboard/paychecks");
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

const UpdateDep = FormSchema2_Dep_Upd.omit({
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

export async function updateDep(id: string, formData: FormData) {
  const { department_name, head, address, phone } = UpdateDep.parse({
    department_name: formData.get("department_name"),
    head: formData.get("head"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  });
  console.log("UpdateProf " + UpdateDep, department_name, head);

  try {
    await sql`
      UPDATE departments 
      SET 
      department_name = ${department_name},
      head = ${head},
      address = ${address},
      phone = ${phone}
      WHERE id = ${id}
    `;
    console.log("sql   " + sql);
  } catch (error) {
    return { message: "Database Error: Failed to Update Dep.", error };
  }
  revalidatePath("/dashboard/deps");
  redirect("/dashboard/deps");
}

const UpdatePay = FormSchema_Pay.omit({
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
  // id: z.string().optional(),
  // name: z.string(),
  // department: z.string(),
  // status: z.string(),
  // date_of_paycheck: z.string(),
  // payment_month: z.string(),
  // amount: z.coerce.number(),
});

export async function updatePay(id: string, formData: FormData) {
  const { name, department, status, date_of_paycheck, payment_month, amount } =
    UpdatePay.parse({
      name: formData.get("name"),
      department: formData.get("department"),
      status: formData.get("status"),
      date_of_paycheck: formData.get("date_of_paycheck"),
      payment_month: formData.get("payment_month"),
      amount: formData.get("amount"),
    });
  console.log("UpdateProf " + UpdatePay, name, department);

  try {
    await sql`
      UPDATE professors_payment 
      SET 
      name = ${name},
      department = ${department},
      status = ${status},
      date_of_paycheck = ${date_of_paycheck},
      payment_month = ${payment_month},
      amount = ${amount}

      WHERE id = ${id}
    `;
    console.log("sql   " + sql);
  } catch (error) {
    return { message: "Database Error: Failed to Update Pay.", error };
  }
  revalidatePath("/dashboard/deps");
  redirect("/dashboard/deps");
}

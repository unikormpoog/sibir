import { sql } from "@vercel/postgres";
import { Professor } from "./definitions";
import { Department } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCardData() {
  noStore();
  try {
    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const profsCountPromise = sql`SELECT COUNT(*) FROM profs`;
    const paycheckCountPromise = sql`SELECT COUNT(*) FROM profs`;
    const paycheckStatusPromise = sql`SELECT
  SUM(CASE WHEN status = 'выплачено' THEN amount ELSE 0 END) AS "выплачено",
  SUM(CASE WHEN status = 'в обработке' THEN amount ELSE 0 END) AS "обрабатывается"
  FROM paychecks2`;
    const data = await Promise.all([
      profsCountPromise,
      paycheckCountPromise,
      paycheckStatusPromise,
    ]);

    const numberOfProfs = Number(data[0].rows[0].count ?? "0");
    const numberOfPaychecks = Number(data[1].rows[0].count ?? "0");
    const totalPaisPaychecks = Number(data[2].rows[0].выплачено ?? "0");
    const totalPendingPaychecks = Number(data[2].rows[0].обрабатывается ?? "0");
    return {
      numberOfProfs,
      numberOfPaychecks,
      totalPaisPaychecks,
      totalPendingPaychecks,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchProfs() {
  noStore();

  try {
    const data = await sql<Professor>`
        SELECT name, department, position, degree, wage
        FROM profs
        
        LIMIT 5`;

    const profs = data.rows;
    return profs;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all profs.");
  }
}

export async function fetchDeps() {
  noStore();

  try {
    const data = await sql<Department>`
    SELECT
    department_name,head
      FROM departments
        `;
    const deps = data.rows;
    return deps;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all deps.");
  }
}
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProfs(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const data = await sql<Professor>`SELECT
    profs.id,
    profs.name,
    profs.department,
    profs.position,
    profs.degree,
    profs.address,
    profs.phone,
    profs.tabel_id,
    profs.wage,
    profs.start_date
  FROM profs
  WHERE
    
  profs.department::citext ILIKE ${`%${query}%`} OR
  profs.name::citext ILIKE ${`%${query}%`} OR
  profs.position::citext ILIKE ${`%${query}%`} OR
  profs.degree::citext ILIKE ${`%${query}%`} OR
  profs.address::citext ILIKE ${`%${query}%`} OR
  profs.phone::text::citext ILIKE ${`%${query}%`} OR
  profs.tabel_id::text::citext ILIKE ${`%${query}%`} OR
  profs.wage::text::citext ILIKE ${`%${query}%`} OR
  profs.start_date::text::citext ILIKE ${`%${query}%`}
 
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
    console.log("SQL Query:", data);

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

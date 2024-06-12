import { sql } from "@vercel/postgres";
import {
  DepartmentNew,
  Professor,
  Professor2,
  ProfessorNew,
} from "./definitions";
import { Department } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { formatCurrency } from "./utils";

export async function fetchCardData() {
  noStore();
  try {
    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 10));
    const profsCountPromise = sql`SELECT COUNT(*) FROM profs`;
    const paycheckCountPromise = sql`SELECT COUNT(*) FROM paychecks2`;
    const paycheckStatusPromise = sql`SELECT
  SUM(CASE WHEN status = 'выплачено' THEN amount ELSE 0 END) AS "выплачено",
  SUM(CASE WHEN status = 'в обработке' THEN amount ELSE 0 END) AS "обрабатывается"
  FROM paychecks2`;
    const depsCount = sql`SELECT COUNT(*) FROM departments`;
    const data = await Promise.all([
      profsCountPromise,
      paycheckCountPromise,
      paycheckStatusPromise,
      depsCount,
    ]);

    const numberOfProfs = Number(data[0].rows[0].count ?? "0");
    const numberOfPaychecks = Number(data[1].rows[0].count ?? "0");
    const totalPaisPaychecks = formatCurrency(data[2].rows[0].выплачено ?? "0");
    const totalPendingPaychecks = formatCurrency(
      data[2].rows[0].обрабатывается ?? "0"
    );
    const totalDepsCount = Number(data[3].rows[0].count ?? "0");
    return {
      numberOfProfs,
      numberOfPaychecks,
      totalPaisPaychecks,
      totalPendingPaychecks,
      totalDepsCount,
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
          ORDER BY id DESC
        LIMIT 5`;

    const latestProfs = data.rows.map((prof) => ({
      ...prof,
      wage: formatCurrency(prof.wage),
    }));
    // const profs = data.rows;
    return latestProfs;
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
    // await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const data = await sql<Professor2>`SELECT
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
    
      LOWER(profs.department) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.name) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.position) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.degree) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.address) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.phone::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.tabel_id::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.wage::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.start_date::text) LIKE ${`%${lowerQuery}%`} 

  
 
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
    // console.log("SQL Query:", data);

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
export async function fetchProfsPages(query: string) {
  noStore();

  try {
    // await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const count = await sql<Professor>`SELECT COUNT(*)
    FROM profs
    WHERE
      LOWER(profs.department) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.name) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.position) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.degree) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.address) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.phone::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.tabel_id::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.wage::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.start_date::text) LIKE ${`%${lowerQuery}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchProfsById(id: string) {
  noStore();
  try {
    const data = await sql<Professor>`
  SELECT  
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
  WHERE profs.id = ${id};
  `;
    const professor = data.rows.map((professor) => ({
      ...professor,
      // If needed, add any data transformations here
    }));

    console.log(professor);
    return professor[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch prof.");
  }
}

// test new type of relationship
//
//
//
//
//
//
//
//
export async function newFetchCardData() {
  noStore();
  try {
    console.log("Fetching revenue data...");
    await new Promise((resolve) => setTimeout(resolve, 10));
    const newProfsCountPromise = sql`SELECT COUNT(*) FROM Professor`;
    const newPaycheckCountPromise = sql`SELECT COUNT(*) FROM Paycheck`;
    const newPaycheckStatusPromise = sql`SELECT
  SUM(CASE WHEN status = 'выплачено' THEN amount ELSE 0 END) AS "выплачено",
  SUM(CASE WHEN status = 'в обработке' THEN amount ELSE 0 END) AS "обрабатывается"
  FROM Paycheck`;
    const newDepsCount = sql`SELECT COUNT(*) FROM Department`;
    const data = await Promise.all([
      newProfsCountPromise,
      newPaycheckCountPromise,
      newPaycheckStatusPromise,
      newDepsCount,
    ]);

    const newNumberOfProfs = Number(data[0].rows[0].count ?? "0");
    const newNumberOfPaychecks = Number(data[1].rows[0].count ?? "0");
    const newTotalPaisPaychecks = formatCurrency(
      data[2].rows[0].выплачено ?? "0"
    );
    const newTotalPendingPaychecks = formatCurrency(
      data[2].rows[0].обрабатывается ?? "0"
    );
    const newTotalDepsCount = Number(data[3].rows[0].count ?? "0");
    return {
      newNumberOfProfs,
      newNumberOfPaychecks,
      newTotalPaisPaychecks,
      newTotalPendingPaychecks,
      newTotalDepsCount,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function newFetchProfs() {
  noStore();

  try {
    const data = await sql<ProfessorNew>`
        SELECT name, department_id, position, degree, wage
        FROM Professor
          ORDER BY start_date DESC
        LIMIT 5`;

    const newLatestProfs = data.rows.map((prof) => ({
      ...prof,
      wage: formatCurrency(prof.wage),
    }));
    // const profs = data.rows;
    return newLatestProfs;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all profs.");
  }
}
//
export async function newFetchDeps() {
  noStore();

  try {
    const data = await sql<DepartmentNew>`
    SELECT
    department, head, address, phone 
      FROM Department
        `;
    const newDeps = data.rows;
    return newDeps;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all deps.");
  }
}
const NEW_ITEMS_PER_PAGE = 6;
export async function newFetchFilteredProfs(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    // await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const data = await sql<ProfessorNew>`SELECT
    profs.id,
    profs.name,
    profs.department_id,
    profs.position,
    profs.degree,
    profs.address,
    profs.phone,
    profs.tabel_id,
    profs.wage,
    profs.start_date
  FROM profs
 
  WHERE
    
      LOWER(profs.department) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.name) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.position) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.degree) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.address) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.phone::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.tabel_id::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.wage::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.start_date::text) LIKE ${`%${lowerQuery}%`} 

  
 
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
    // console.log("SQL Query:", data);

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
export async function newFetchProfsPages(query: string) {
  noStore();

  try {
    // await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const count = await sql<ProfessorNew>`SELECT COUNT(*)
    FROM Professor
    WHERE
      LOWER(profs.department_id) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.name) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.position) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.degree) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.address) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.phone::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.tabel_id::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.wage::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(profs.start_date::text) LIKE ${`%${lowerQuery}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function newFetchProfsById(id: string) {
  noStore();
  try {
    const data = await sql<ProfessorNew>`
  SELECT  
    profs.id,
    profs.name,
    profs.department_id,
    profs.position,
    profs.degree,
    profs.address,
    profs.phone,
    profs.tabel_id,
    profs.wage,
    profs.start_date
  FROM profs
  WHERE profs.id = ${id};
  `;
    const professor = data.rows.map((professor) => ({
      ...professor,
      // If needed, add any data transformations here
    }));

    console.log(professor);
    return professor[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch prof.");
  }
}

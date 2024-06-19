import { sql } from "@vercel/postgres";
import {
  DepartmentNew,
  PaycheckNew,
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
    const paycheckCountPromise = sql`SELECT COUNT(*) FROM professors_payment`;
    const paycheckStatusPromise = sql`SELECT
  SUM(CASE WHEN status = 'выплачено' THEN amount ELSE 0 END) AS "выплачено",
  SUM(CASE WHEN status = 'в обработке' THEN amount ELSE 0 END) AS "обрабатывается"
  FROM professors_payment`;
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
        LIMIT 4`;

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

export async function fetchProfs_for_select() {
  noStore();

  try {
    const data = await sql<Professor>`
        SELECT name, department, position, degree, wage
        FROM profs
          ORDER BY department DESC
       `;

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
    department_name,head,address,phone
      FROM departments
        LIMIT 4
        `;
    const deps = data.rows;
    console.log(deps);

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

//
export async function fetchProfsByIdPrecise(id: string) {
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
    console.log(sql);

    console.log(data);
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch prof.");
  }
}

//
export async function fetchDepsById(id: string) {
  noStore();
  try {
    const data = await sql<Department>`
  SELECT  
    departments.id,
    departments.department_name,
    departments.head,
    departments.address,
    departments.phone
  FROM departments
  WHERE departments.id = ${id};
  `;
    const dep = data.rows.map((dep) => ({
      ...dep,
      // If needed, add any data transformations here
    }));

    console.log(dep);
    return dep[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch prof.");
  }
}

export async function fetchDepsPages(query: string) {
  noStore();

  try {
    // await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const count = await sql<Professor>`SELECT COUNT(*)
    FROM departments
    WHERE
      LOWER(departments.department_name) LIKE ${`%${lowerQuery}%`} OR
    
      LOWER(departments.address) LIKE ${`%${lowerQuery}%`} OR
      LOWER(departments.phone::text) LIKE ${`%${lowerQuery}%`} 
    
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch deps.");
  }
}

const ITEMS_PER_PAGE_1 = 5;
export async function fetchFilteredDeps(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const data = await sql<Department>`SELECT
    departments.id,
    departments.department_name,
    departments.head,
    departments.address,
    departments.phone
  FROM departments

  WHERE
    
 
      LOWER(departments.department_name) LIKE ${`%${lowerQuery}%`} OR
      LOWER(departments.head) LIKE ${`%${lowerQuery}%`} OR
      LOWER(departments.address) LIKE ${`%${lowerQuery}%`} OR
      LOWER(departments.phone::text) LIKE ${`%${lowerQuery}%`} 
  
 
  LIMIT ${ITEMS_PER_PAGE_1} OFFSET ${offset}
  `;
    // console.log("SQL Query:", data);

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchFilteredPay(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE_1;
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const data = await sql<PaycheckNew>`SELECT
    professors_payment.id,
    professors_payment.name,
    professors_payment.department,
    professors_payment.status,
    professors_payment.amount,
    professors_payment.payment_month,
    professors_payment.date_of_paycheck

  FROM professors_payment

  WHERE
   LOWER(professors_payment.date_of_paycheck) LIKE ${`%${lowerQuery}%`} OR
    LOWER(professors_payment.payment_month) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.name) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.department) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.status) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.amount::text) LIKE ${`%${lowerQuery}%`} 
  
 
  LIMIT ${ITEMS_PER_PAGE_1} OFFSET ${offset}
  `;
    // console.log("SQL Query:", data);

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchPaysById(id: string) {
  noStore();
  try {
    const data = await sql<PaycheckNew>`
  SELECT  
     professors_payment.id,
    professors_payment.name,
    professors_payment.department,
    professors_payment.status,
    professors_payment.date_of_paycheck,
    professors_payment.amount,
    professors_payment.payment_month

  FROM professors_payment
  WHERE professors_payment.id = ${id};
  `;
    const pay = data.rows.map((pay) => ({
      ...pay,
      // If needed, add any data transformations here
    }));

    console.log(pay);
    return pay[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch prof.");
  }
}
export async function fetchPaysPages(query: string) {
  noStore();

  try {
    // await sql`CREATE EXTENSION IF NOT EXISTS citext;`;
    const lowerQuery = query.toLowerCase();

    const count = await sql<PaycheckNew>`SELECT COUNT(*)
    FROM professors_payment
    WHERE
      LOWER(professors_payment.name) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.department) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.status) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.amount::text) LIKE ${`%${lowerQuery}%`} OR
      LOWER(professors_payment.date_of_paycheck::text) LIKE ${`%${lowerQuery}%`}
    
  `;
    const totalPages = Math.ceil(
      Number(count.rows[0].count) / ITEMS_PER_PAGE_1
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch deps.");
  }
}

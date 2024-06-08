const { db } = require("@vercel/postgres");

const {
  users1,
  profs,
  deps,
  paychecks2,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users1 (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;

    console.log(`Created "users1" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users1.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users1 (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users1`);

    return {
      createTable,
      users1: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedProfs(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql` 
        CREATE TABLE IF NOT EXISTS profs (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            department TEXT NOT NULL,
            position TEXT NOT NULL,
            degree TEXT NOT NULL,
            address TEXT NOT NULL,
            phone BIGINT NOT NULL,
            tabel_id INT NOT NULL,
            wage INT NOT NULL,
            start_date DATE NOT NULL ); `;

    console.log('Created "profs" table');

    const insertedProfs = await Promise.all(
      profs.map(
        (prof) => client.sql`
                        INSERT INTO profs (id,name,department,position,degree,address,
                            phone,tabel_id,wage,start_date)
                            VALUES (${prof.id},${prof.name},${prof.department},
                                ${prof.position},${prof.degree},${prof.address},
                                ${prof.phone},${prof.tabel_id},${prof.wage},${prof.start_date}
                            )
                            ON CONFLICT (id) DO NOTHING; `
      )
    );
    console.log(`Seeded ${insertedProfs.length} profs`);
    return {
      createTable,
      profs: insertedProfs,
    };
  } catch (error) {
    console.error("Error seeding profs:", error);
    throw error;
  }
}

async function seedDeps(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS departments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        department_name VARCHAR(255) NOT NULL,
        head VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        phone BIGINT NOT NULL
    ); `;

    console.log('Created "departments" table');

    const insertedDeps = await Promise.all(
      deps.map(
        (dep) => client.sql`
            INSERT INTO departments (id, department_name, head, address, phone)
                        VALUES (${dep.id}, ${dep.department_name}, ${dep.head}, ${dep.address}, ${dep.phone})
                        ON CONFLICT (id) DO NOTHING;
            `
      )
    );
    console.log(`Seeded ${insertedDeps.length} departments`);
    return {
      createTable,
      departments: insertedDeps,
    };
  } catch (error) {
    console.error("Error seeding departments:", error);
    throw error;
  }
}

async function seedPaychecks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql` 
    CREATE TABLE IF NOT EXISTS paychecks2 (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        prof_id UUID NOT NULL,
        professor VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        status VARCHAR(255) NOT NULL,
        amount BIGINT NOT NULL,
        hours_worked INT NOT NULL,
        payment_month VARCHAR(255) NOT NULL,
        full_time_hours INT NOT NULL,
        rate INT NOT NULL
    );`;

    console.log('Created "paychecks2" table');
    const insertedPaychecks = await Promise.all(
      paychecks2.map(
        (paycheck) => client.sql`
        INSERT INTO paychecks2 ( prof_id, professor, department, date, status, amount, hours_worked, payment_month, full_time_hours, rate)
        VALUES (${paycheck.prof_id}, ${paycheck.professor}, ${paycheck.department}, ${paycheck.date}, ${paycheck.status}, ${paycheck.amount}, ${paycheck.hours_worked}, ${paycheck.payment_month}, ${paycheck.full_time_hours}, ${paycheck.rate})
        ON CONFLICT (id) DO NOTHING;`
      )
    );
    console.log(`Seeded ${insertedPaychecks.length} paychecks2`);
    return {
      createTable,
      paychecks2: insertedPaychecks,
    };
  } catch (error) {
    console.error("Error seeding paychecks2:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // //   await seedDeps(client);
  // await seedPaychecks(client);
  await seedProfs(client);
  //   await seedUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});

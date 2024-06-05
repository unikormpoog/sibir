// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const profs = [
  {
    id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
    name: "Иван Иванов",
    department: "Кафедра математики",
    position: "Профессор",
    degree: "Доктор наук",
    address: "ул. Ленина, д. 10, кв. 5",
    phone: 79161234567,
    tabel_id: 1001,
    wage: 120000,
    start_date: "2010-09-01",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Мария Петрова",
    department: "Кафедра физики",
    position: "Доцент",
    degree: "Кандидат наук",
    address: "пр. Мира, д. 45, кв. 12",
    phone: 79161234568,
    tabel_id: 1002,
    wage: 90000,
    start_date: "2012-09-01",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Сергей Смирнов",
    department: "Кафедра химии",
    position: "Ассистент",
    degree: "Магистр",
    address: "ул. Гагарина, д. 23, кв. 6",
    phone: 79161234569,
    tabel_id: 1003,
    wage: 70000,
    start_date: "2015-09-01",
  },
];

const deps = [
  {
    id: "1a2b3c4d-5e6f-7890-ab12-34567890cdef",
    department_name: "Кафедра математики",
    head: "Петр Алексеев",
    address: "ул. Ломоносова, д. 1, каб. 101",
    phone: 79261234501,
  },
  {
    id: "2b3c4d5e-6f78-890a-b123-4567890cdefa",
    department_name: "Кафедра физики",
    head: "Мария Васильева",
    address: "пр. Науки, д. 12, каб. 202",
    phone: 79261234502,
  },
  {
    id: "3c4d5e6f-7890-ab12-3456-7890cdefab12",
    department_name: "Кафедра химии",
    head: "Иван Петров",
    address: "ул. Химиков, д. 15, каб. 303",
    phone: 79261234503,
  },
];

const paychecks = [
  {
    prof_id: profs[0].id,
    professor: profs[0].name,
    department: profs[0].department,
    date: "2022-05-06",
    status: "выплачено",
    amount: 15795,
    hours_worked: 160,
    payment_month: "2024-05",
    full_time_hours: 160,
    rate: 1200,
    get amount() {
      return this.hours_worked * this.rate;
    },
    prof_id: profs[0].id,
    professor: profs[0].name,
    department: profs[0].department,
    date: "2022-06-10",
    status: "в обработке",
    amount: 17785,
    hours_worked: 160,
    payment_month: "2024-06",
    full_time_hours: 170,
    rate: 1300,
    get amount() {
      return this.hours_worked * this.rate;
    },
    prof_id: profs[0].id,
    professor: profs[0].name,
    department: profs[0].department,
    date: "2022-05-06",
    status: "в обработке",
    amount: 19760,
    hours_worked: 155,
    payment_month: "2024-05",
    full_time_hours: 120,
    rate: 1500,
    get amount() {
      return this.hours_worked * this.rate;
    },
  },
];

// const revenue = [
//   { month: "Jan", revenue: 2000 },
//   { month: "Feb", revenue: 1800 },
//   { month: "Mar", revenue: 2200 },
//   { month: "Apr", revenue: 2500 },
//   { month: "May", revenue: 2300 },
//   { month: "Jun", revenue: 3200 },
//   { month: "Jul", revenue: 3500 },
//   { month: "Aug", revenue: 3700 },
//   { month: "Sep", revenue: 2500 },
//   { month: "Oct", revenue: 2800 },
//   { month: "Nov", revenue: 3000 },
//   { month: "Dec", revenue: 4800 },
// ];

module.exports = {
  users,
  profs,
  deps,
  paychecks,
};

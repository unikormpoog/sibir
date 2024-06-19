export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Professor = {
  id: string;
  name: string;
  department: string;
  position: string;
  degree: string;
  address: string;
  phone: number;
  tabel_id: number;
  wage: number;
  start_date: string;
};

export type Professor2 = {
  id: string;
  name: string;
  department: string;
  position: string;
  degree: string;
  address: string;
  phone: number;
  tabel_id: number;
  wage: number;
  start_date: string;
 
};

export type Department = {
  id: string;
  department_name: string;
  head: string;
  address: string;
  phone: number;
};

export type Paycheck = {
  prof_id: string;
  professor: string;
  department: string;
  date: string;
  status: "в обработке" | "выплачено";
  amount: number;
  hours_worked: number;
  payment_month: string;
  full_time_hours: number;
  rate: number;
};
export type Paycheck_2 = {
  prof_id: string;
  professor: string;
  department: string;
  date: string;
  status: "в обработке" | "выплачено";
  amount: number;
  hours_worked: number;
  payment_month: string;
  full_time_hours: number;
  rate: number;
};
//test

export type UserNew = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ProfessorNew = {
  id: string;
  name: string;
  department: string;
  position: string;
  degree: string;
  address: string;
  phone: number;
  tabel_id: number;
  wage: number;
  start_date: string;
};

export type DepartmentNew = {
  id: string;
  department_name: string;
  head: string;
  head_name: string;
  address: string;
  phone: number;
};

export type PaycheckNew = {
  count(count: any): unknown;
  id: string;
  name: string;
  department: string;
  status: "в обработке" | "выплачено";
  date_of_paycheck: string;
  amount: number;
  payment_month: string;
};

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

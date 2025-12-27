export interface IBankAccount {
  id: string;
  createdAt: Date;
  userId: string;
  type: string;
  label: string;
  balance: number;
  incomes?: Income[];
  expenses?: Expense[];
}

interface Income {
  id: string;
  bankAccountId: string;
  income: number;
  object: string;
  createdAt: Date;
}

interface Expense {
  id: string;
  bankAccountId: string;
  expense: number;
  object: string;
  createdAt: Date;
}

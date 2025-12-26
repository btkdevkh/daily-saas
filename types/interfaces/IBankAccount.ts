export interface IBankAccount {
  id: string;
  createdAt: Date;
  userId: string;
  type: string;
  label: string;
  balance: number;
}

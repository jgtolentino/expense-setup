export interface Expense {
  id: string;
  userId: string;
  date: Date;
  particulars: string;
  client: string;
  ceNumber: string;
  category: 'Meals' | 'Transpo' | 'Miscellaneous';
  amount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseFormData {
  date: Date;
  particulars: string;
  client: string;
  ceNumber: string;
  category: 'Meals' | 'Transpo' | 'Miscellaneous';
  amount: number;
  receipt?: File;
}
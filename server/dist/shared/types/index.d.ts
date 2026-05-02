export interface Transaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    tags?: string[];
}
export interface CreateTransactionDto {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    date: Date;
    tags?: string[];
}
export interface UpdateTransactionDto {
    amount?: number;
    type?: 'income' | 'expense';
    category?: string;
    description?: string;
    date?: Date;
    tags?: string[];
}
export interface Statistics {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    monthlyStats: MonthlyStats[];
    categoryBreakdown: CategoryStats[];
    trendData: TrendData[];
}
export interface MonthlyStats {
    month: string;
    income: number;
    expense: number;
    balance: number;
}
export interface CategoryStats {
    category: string;
    amount: number;
    percentage: number;
    transactionCount: number;
}
export interface TrendData {
    month: string;
    income: number;
    expense: number;
}
export declare const INCOME_CATEGORIES: readonly ["เงินเดือน", "โบนัส", "รายได้เสริม", "ลงทุน", "อื่นๆ"];
export declare const EXPENSE_CATEGORIES: readonly ["อาหาร", "การเดินทาง", "ช้อปปิ้ง", "บิลค่าใช้จ่าย", "บันเทิง", "สุขภาพ", "อื่นๆ"];

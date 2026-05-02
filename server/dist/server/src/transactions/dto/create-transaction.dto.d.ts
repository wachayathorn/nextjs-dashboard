export declare class CreateTransactionDto {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    date: Date;
    tags?: string[];
}

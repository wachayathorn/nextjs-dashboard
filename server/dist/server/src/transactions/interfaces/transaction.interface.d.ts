import { Transaction } from '../../../../shared/types';
export interface ITransactionRepository {
    create(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findById(id: string): Promise<Transaction | null>;
    update(id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Transaction | null>;
    delete(id: string): Promise<boolean>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]>;
    findByType(type: 'income' | 'expense'): Promise<Transaction[]>;
    findByCategory(category: string): Promise<Transaction[]>;
}

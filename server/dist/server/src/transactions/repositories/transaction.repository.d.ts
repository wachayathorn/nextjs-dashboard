import { ITransactionRepository } from '../interfaces/transaction.interface';
import { Transaction } from '../../../../shared/types';
import { InMemoryStorageService } from '../../common/storage/services/in-memory-storage.service';
export declare class TransactionRepository implements ITransactionRepository {
    private readonly storage;
    constructor(storage: InMemoryStorageService<Transaction>);
    create(transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findById(id: string): Promise<Transaction | null>;
    update(id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Transaction | null>;
    delete(id: string): Promise<boolean>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]>;
    findByType(type: 'income' | 'expense'): Promise<Transaction[]>;
    findByCategory(category: string): Promise<Transaction[]>;
}

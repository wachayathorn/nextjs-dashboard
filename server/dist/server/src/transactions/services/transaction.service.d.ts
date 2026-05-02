import { ITransactionRepository } from '../interfaces/transaction.interface';
import { Transaction, CreateTransactionDto, UpdateTransactionDto } from '../../../../shared/types';
export declare class TransactionService {
    private readonly transactionRepository;
    constructor(transactionRepository: ITransactionRepository);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findById(id: string): Promise<Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    delete(id: string): Promise<void>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]>;
    findByType(type: 'income' | 'expense'): Promise<Transaction[]>;
    findByCategory(category: string): Promise<Transaction[]>;
    private validateTransaction;
}

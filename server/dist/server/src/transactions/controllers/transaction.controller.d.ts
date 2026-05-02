import { TransactionService } from '../services/transaction.service';
import { StatisticsService } from '../services/statistics.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction, Statistics } from '../../../../shared/types';
export declare class TransactionController {
    private readonly transactionService;
    private readonly statisticsService;
    constructor(transactionService: TransactionService, statisticsService: StatisticsService);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    getStatistics(): Promise<Statistics>;
    getCategories(): Promise<{
        income: string[];
        expense: string[];
    }>;
    findById(id: string): Promise<Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    delete(id: string): Promise<void>;
    findByDateRange(startDate: string, endDate: string): Promise<Transaction[]>;
    findByType(type: 'income' | 'expense'): Promise<Transaction[]>;
    findByCategory(category: string): Promise<Transaction[]>;
}

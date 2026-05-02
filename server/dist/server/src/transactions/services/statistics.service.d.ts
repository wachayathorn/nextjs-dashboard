import { ITransactionRepository } from '../interfaces/transaction.interface';
import { Statistics } from '../../../../shared/types';
export declare class StatisticsService {
    private readonly transactionRepository;
    constructor(transactionRepository: ITransactionRepository);
    getStatistics(): Promise<Statistics>;
    private getMonthlyStats;
    private getCategoryBreakdown;
    private getTrendData;
}

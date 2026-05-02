import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { StatisticsService } from './services/statistics.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { InMemoryStorageService } from '../common/storage/services/in-memory-storage.service';
import { ITransactionRepository } from './interfaces/transaction.interface';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    StatisticsService,
    TransactionRepository,
    {
      provide: 'InMemoryStorageService',
      useClass: InMemoryStorageService,
    },
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepository,
    },
  ],
  exports: [
    TransactionService,
    StatisticsService,
    TransactionRepository,
  ],
})
export class TransactionsModule {}

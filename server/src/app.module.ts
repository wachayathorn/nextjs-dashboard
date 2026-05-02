import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { InMemoryStorageService } from './common/storage/services/in-memory-storage.service';

@Module({
  imports: [TransactionsModule],
  providers: [InMemoryStorageService],
})
export class AppModule {}

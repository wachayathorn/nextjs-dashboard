import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/transaction.interface';
import { Transaction } from '../../../../shared/types';
import { TransactionEntity } from '../entities/transaction.entity';
import { InMemoryStorageService } from '../../common/storage/services/in-memory-storage.service';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(@Inject('InMemoryStorageService') private readonly storage: InMemoryStorageService<Transaction>) {}

  async create(transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    const transaction = new TransactionEntity(transactionData);
    this.storage.save(transaction.id, transaction.toJSON());
    return transaction.toJSON();
  }

  async findAll(): Promise<Transaction[]> {
    const allTransactions = Array.from(this.storage.getAll().values());
    return allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = this.storage.get(id);
    return transaction || null;
  }

  async update(id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Transaction | null> {
    const existingTransaction = this.storage.get(id);
    if (!existingTransaction) return null;

    const entity = new TransactionEntity({
      amount: existingTransaction.amount,
      type: existingTransaction.type,
      category: existingTransaction.category,
      description: existingTransaction.description,
      date: existingTransaction.date,
      tags: existingTransaction.tags,
    });

    entity.update(data);
    this.storage.save(id, entity.toJSON());
    return entity.toJSON();
  }

  async delete(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    const allTransactions = await this.findAll();
    return allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  async findByType(type: 'income' | 'expense'): Promise<Transaction[]> {
    const allTransactions = await this.findAll();
    return allTransactions.filter(transaction => transaction.type === type);
  }

  async findByCategory(category: string): Promise<Transaction[]> {
    const allTransactions = await this.findAll();
    return allTransactions.filter(transaction => transaction.category === category);
  }
}

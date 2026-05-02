import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/transaction.interface';
import { Transaction, CreateTransactionDto, UpdateTransactionDto } from '../../../../shared/types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../../../shared/types';

@Injectable()
export class TransactionService {
  constructor(@Inject('ITransactionRepository') private readonly transactionRepository: ITransactionRepository) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    this.validateTransaction(createTransactionDto.type, createTransactionDto.category);
    return this.transactionRepository.create(createTransactionDto);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const existingTransaction = await this.transactionRepository.findById(id);
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    if (updateTransactionDto.type && updateTransactionDto.category) {
      this.validateTransaction(updateTransactionDto.type, updateTransactionDto.category);
    }

    const updatedTransaction = await this.transactionRepository.update(id, updateTransactionDto);
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }

  async delete(id: string): Promise<void> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    const deleted = await this.transactionRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException(`Failed to delete transaction with ID ${id}`);
    }
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    return this.transactionRepository.findByDateRange(startDate, endDate);
  }

  async findByType(type: 'income' | 'expense'): Promise<Transaction[]> {
    return this.transactionRepository.findByType(type);
  }

  async findByCategory(category: string): Promise<Transaction[]> {
    return this.transactionRepository.findByCategory(category);
  }

  private validateTransaction(type: 'income' | 'expense', category: string): void {
    const validCategories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    
    if (!validCategories.includes(category as any)) {
      const validCategoriesStr = validCategories.join(', ');
      throw new BadRequestException(
        `Invalid category "${category}" for type "${type}". Valid categories are: ${validCategoriesStr}`
      );
    }
  }
}

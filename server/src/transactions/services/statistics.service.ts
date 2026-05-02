import { Injectable, Inject } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/transaction.interface';
import { Statistics, MonthlyStats, CategoryStats, TrendData } from '../../../../shared/types';

@Injectable()
export class StatisticsService {
  constructor(@Inject('ITransactionRepository') private readonly transactionRepository: ITransactionRepository) {}

  async getStatistics(): Promise<Statistics> {
    const allTransactions = await this.transactionRepository.findAll();
    
    const totalIncome = allTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = allTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const monthlyStats = await this.getMonthlyStats(allTransactions);
    const categoryBreakdown = await this.getCategoryBreakdown(allTransactions);
    const trendData = await this.getTrendData(allTransactions);

    return {
      totalIncome,
      totalExpense,
      balance,
      monthlyStats,
      categoryBreakdown,
      trendData,
    };
  }

  private async getMonthlyStats(transactions: any[]): Promise<MonthlyStats[]> {
    const monthlyData = new Map<string, { income: number; expense: number }>();

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { income: 0, expense: 0 });
      }

      const monthData = monthlyData.get(monthKey)!;
      if (transaction.type === 'income') {
        monthData.income += transaction.amount;
      } else {
        monthData.expense += transaction.amount;
      }
    });

    return Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
        balance: data.income - data.expense,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months
  }

  private async getCategoryBreakdown(transactions: any[]): Promise<CategoryStats[]> {
    const categoryData = new Map<string, { amount: number; count: number }>();

    transactions.forEach(transaction => {
      if (!categoryData.has(transaction.category)) {
        categoryData.set(transaction.category, { amount: 0, count: 0 });
      }

      const categoryInfo = categoryData.get(transaction.category)!;
      categoryInfo.amount += transaction.amount;
      categoryInfo.count += 1;
    });

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    return Array.from(categoryData.entries())
      .map(([category, data]) => ({
        category,
        amount: data.amount,
        percentage: totalAmount > 0 ? (data.amount / totalAmount) * 100 : 0,
        transactionCount: data.count,
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  private async getTrendData(transactions: any[]): Promise<TrendData[]> {
    const monthlyData = new Map<string, { income: number; expense: number }>();

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { income: 0, expense: 0 });
      }

      const monthData = monthlyData.get(monthKey)!;
      if (transaction.type === 'income') {
        monthData.income += transaction.amount;
      } else {
        monthData.expense += transaction.amount;
      }
    });

    return Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months
  }
}

'use client';

import { useState, useEffect } from 'react';
import { Statistics, Transaction } from '@/types';
import { transactionApi } from '@/lib/api';
import { formatCurrency, formatDate, formatMonth } from '@/lib/utils';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import TransactionForm from '@/components/forms/transaction-form';

export default function Dashboard() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsData, transactionsData] = await Promise.all([
        transactionApi.getStatistics(),
        transactionApi.getAll(),
      ]);
      
      setStatistics(statsData);
      setRecentTransactions(transactionsData.slice(0, 5));
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive text-xl mb-4">Error</div>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">Expense Dashboard</h1>
            </div>
            <button 
              onClick={() => setShowTransactionForm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(statistics?.totalIncome || 0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expense</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(statistics?.totalExpense || 0)}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Balance</p>
                <p className={`text-2xl font-bold ${statistics?.balance && statistics.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(statistics?.balance || 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-primary">
                  {statistics?.monthlyStats.length ? formatMonth(statistics.monthlyStats[statistics.monthlyStats.length - 1].month) : 'N/A'}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No transactions yet</p>
              ) : (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="font-medium">{transaction.description}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.category} • {formatDate(transaction.date)}
                      </div>
                    </div>
                    <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
            <div className="space-y-4">
              {statistics?.categoryBreakdown.slice(0, 5).map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm text-muted-foreground">{category.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 font-semibold">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <TransactionForm
          onClose={() => setShowTransactionForm(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Statistics, Transaction } from '@/types';
import { transactionApi } from '@/lib/api';
import { formatCurrency, formatDate, formatMonth } from '@/lib/utils';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import TransactionForm from '@/components/forms/transaction-form';
import CategoryPieChart from '@/components/charts/category-pie-chart-chartjs';

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error</div>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Expense Dashboard</h1>
            </div>
            <button 
              onClick={() => setShowTransactionForm(true)}
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md flex items-center gap-2"
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
                <p className="text-sm font-medium text-gray-500">Total Income</p>
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
                <p className="text-sm font-medium text-gray-500">Total Expense</p>
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
                <p className="text-sm font-medium text-gray-500">Balance</p>
                <p className={`text-2xl font-bold ${statistics?.balance && statistics.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(statistics?.balance || 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-blue-500">
                  {statistics?.monthlyStats.length ? formatMonth(statistics.monthlyStats[statistics.monthlyStats.length - 1].month) : 'N/A'}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No transactions yet</p>
              ) : (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="font-medium">{transaction.description}</span>
                      </div>
                      <div className="text-sm text-gray-500">
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
            {statistics?.categoryBreakdown && statistics.categoryBreakdown.length > 0 ? (
              <CategoryPieChart data={statistics.categoryBreakdown} />
            ) : (
              <div className="flex items-center justify-center h-80">
                <p className="text-gray-500 text-center">No category data available</p>
              </div>
            )}
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

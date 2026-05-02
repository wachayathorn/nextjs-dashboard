import axios from 'axios';
import { Transaction, CreateTransactionDto, UpdateTransactionDto, Statistics } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const transactionApi = {
  // Get all transactions
  getAll: async (): Promise<Transaction[]> => {
    const response = await apiClient.get('/transactions');
    return response.data;
  },

  // Get transaction by ID
  getById: async (id: string): Promise<Transaction> => {
    const response = await apiClient.get(`/transactions/${id}`);
    return response.data;
  },

  // Create new transaction
  create: async (data: CreateTransactionDto): Promise<Transaction> => {
    const response = await apiClient.post('/transactions', data);
    return response.data;
  },

  // Update transaction
  update: async (id: string, data: UpdateTransactionDto): Promise<Transaction> => {
    const response = await apiClient.patch(`/transactions/${id}`, data);
    return response.data;
  },

  // Delete transaction
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/transactions/${id}`);
  },

  // Get statistics
  getStatistics: async (): Promise<Statistics> => {
    const response = await apiClient.get('/transactions/statistics');
    return response.data;
  },

  // Get categories
  getCategories: async (): Promise<{ income: string[]; expense: string[] }> => {
    const response = await apiClient.get('/transactions/categories');
    return response.data;
  },

  // Filter by date range
  getByDateRange: async (startDate: Date, endDate: Date): Promise<Transaction[]> => {
    const response = await apiClient.get('/transactions/filter/date-range', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    return response.data;
  },

  // Filter by type
  getByType: async (type: 'income' | 'expense'): Promise<Transaction[]> => {
    const response = await apiClient.get(`/transactions/filter/type/${type}`);
    return response.data;
  },

  // Filter by category
  getByCategory: async (category: string): Promise<Transaction[]> => {
    const response = await apiClient.get(`/transactions/filter/category/${category}`);
    return response.data;
  },
};

export default apiClient;

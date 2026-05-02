"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
let StatisticsService = class StatisticsService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async getStatistics() {
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
    async getMonthlyStats(transactions) {
        const monthlyData = new Map();
        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!monthlyData.has(monthKey)) {
                monthlyData.set(monthKey, { income: 0, expense: 0 });
            }
            const monthData = monthlyData.get(monthKey);
            if (transaction.type === 'income') {
                monthData.income += transaction.amount;
            }
            else {
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
            .slice(-6);
    }
    async getCategoryBreakdown(transactions) {
        const categoryData = new Map();
        transactions.forEach(transaction => {
            if (!categoryData.has(transaction.category)) {
                categoryData.set(transaction.category, { amount: 0, count: 0 });
            }
            const categoryInfo = categoryData.get(transaction.category);
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
    async getTrendData(transactions) {
        const monthlyData = new Map();
        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!monthlyData.has(monthKey)) {
                monthlyData.set(monthKey, { income: 0, expense: 0 });
            }
            const monthData = monthlyData.get(monthKey);
            if (transaction.type === 'income') {
                monthData.income += transaction.amount;
            }
            else {
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
            .slice(-6);
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ITransactionRepository')),
    __metadata("design:paramtypes", [Object])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map
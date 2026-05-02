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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../../../shared/types");
let TransactionService = class TransactionService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async create(createTransactionDto) {
        this.validateTransaction(createTransactionDto.type, createTransactionDto.category);
        return this.transactionRepository.create(createTransactionDto);
    }
    async findAll() {
        return this.transactionRepository.findAll();
    }
    async findById(id) {
        const transaction = await this.transactionRepository.findById(id);
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }
    async update(id, updateTransactionDto) {
        const existingTransaction = await this.transactionRepository.findById(id);
        if (!existingTransaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        if (updateTransactionDto.type && updateTransactionDto.category) {
            this.validateTransaction(updateTransactionDto.type, updateTransactionDto.category);
        }
        const updatedTransaction = await this.transactionRepository.update(id, updateTransactionDto);
        if (!updatedTransaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return updatedTransaction;
    }
    async delete(id) {
        const transaction = await this.transactionRepository.findById(id);
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        const deleted = await this.transactionRepository.delete(id);
        if (!deleted) {
            throw new common_1.BadRequestException(`Failed to delete transaction with ID ${id}`);
        }
    }
    async findByDateRange(startDate, endDate) {
        return this.transactionRepository.findByDateRange(startDate, endDate);
    }
    async findByType(type) {
        return this.transactionRepository.findByType(type);
    }
    async findByCategory(category) {
        return this.transactionRepository.findByCategory(category);
    }
    validateTransaction(type, category) {
        const validCategories = type === 'income' ? types_1.INCOME_CATEGORIES : types_1.EXPENSE_CATEGORIES;
        if (!validCategories.includes(category)) {
            const validCategoriesStr = validCategories.join(', ');
            throw new common_1.BadRequestException(`Invalid category "${category}" for type "${type}". Valid categories are: ${validCategoriesStr}`);
        }
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ITransactionRepository')),
    __metadata("design:paramtypes", [Object])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map
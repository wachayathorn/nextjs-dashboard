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
exports.TransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const transaction_entity_1 = require("../entities/transaction.entity");
const in_memory_storage_service_1 = require("../../common/storage/services/in-memory-storage.service");
let TransactionRepository = class TransactionRepository {
    constructor(storage) {
        this.storage = storage;
    }
    async create(transactionData) {
        const transaction = new transaction_entity_1.TransactionEntity(transactionData);
        this.storage.save(transaction.id, transaction.toJSON());
        return transaction.toJSON();
    }
    async findAll() {
        const allTransactions = Array.from(this.storage.getAll().values());
        return allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    async findById(id) {
        const transaction = this.storage.get(id);
        return transaction || null;
    }
    async update(id, data) {
        const existingTransaction = this.storage.get(id);
        if (!existingTransaction)
            return null;
        const entity = new transaction_entity_1.TransactionEntity({
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
    async delete(id) {
        return this.storage.delete(id);
    }
    async findByDateRange(startDate, endDate) {
        const allTransactions = await this.findAll();
        return allTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }
    async findByType(type) {
        const allTransactions = await this.findAll();
        return allTransactions.filter(transaction => transaction.type === type);
    }
    async findByCategory(category) {
        const allTransactions = await this.findAll();
        return allTransactions.filter(transaction => transaction.category === category);
    }
};
exports.TransactionRepository = TransactionRepository;
exports.TransactionRepository = TransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('InMemoryStorageService')),
    __metadata("design:paramtypes", [in_memory_storage_service_1.InMemoryStorageService])
], TransactionRepository);
//# sourceMappingURL=transaction.repository.js.map
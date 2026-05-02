"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_controller_1 = require("./controllers/transaction.controller");
const transaction_service_1 = require("./services/transaction.service");
const statistics_service_1 = require("./services/statistics.service");
const transaction_repository_1 = require("./repositories/transaction.repository");
const in_memory_storage_service_1 = require("../common/storage/services/in-memory-storage.service");
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [transaction_controller_1.TransactionController],
        providers: [
            transaction_service_1.TransactionService,
            statistics_service_1.StatisticsService,
            transaction_repository_1.TransactionRepository,
            {
                provide: 'InMemoryStorageService',
                useClass: in_memory_storage_service_1.InMemoryStorageService,
            },
            {
                provide: 'ITransactionRepository',
                useClass: transaction_repository_1.TransactionRepository,
            },
        ],
        exports: [
            transaction_service_1.TransactionService,
            statistics_service_1.StatisticsService,
            transaction_repository_1.TransactionRepository,
        ],
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map
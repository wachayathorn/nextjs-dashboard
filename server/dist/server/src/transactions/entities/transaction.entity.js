"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEntity = void 0;
const uuid_1 = require("uuid");
class TransactionEntity {
    constructor(data) {
        this.id = (0, uuid_1.v4)();
        this.amount = data.amount;
        this.type = data.type;
        this.category = data.category;
        this.description = data.description;
        this.date = new Date(data.date);
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.tags = data.tags;
    }
    update(data) {
        if (data.amount !== undefined)
            this.amount = data.amount;
        if (data.type !== undefined)
            this.type = data.type;
        if (data.category !== undefined)
            this.category = data.category;
        if (data.description !== undefined)
            this.description = data.description;
        if (data.date !== undefined)
            this.date = new Date(data.date);
        if (data.tags !== undefined)
            this.tags = data.tags;
        this.updatedAt = new Date();
    }
    toJSON() {
        return {
            id: this.id,
            amount: this.amount,
            type: this.type,
            category: this.category,
            description: this.description,
            date: this.date,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            tags: this.tags,
        };
    }
    static createFromDTO(dto) {
        return new TransactionEntity(dto);
    }
}
exports.TransactionEntity = TransactionEntity;
//# sourceMappingURL=transaction.entity.js.map
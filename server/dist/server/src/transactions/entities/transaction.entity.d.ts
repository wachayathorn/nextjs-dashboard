import { Transaction } from '../../../../shared/types';
export declare class TransactionEntity implements Transaction {
    readonly id: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    date: Date;
    readonly createdAt: Date;
    updatedAt: Date;
    tags?: string[];
    constructor(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>);
    update(data: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>): void;
    toJSON(): Transaction;
    static createFromDTO(dto: any): TransactionEntity;
}

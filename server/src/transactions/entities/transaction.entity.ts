import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../../../../shared/types';

export class TransactionEntity implements Transaction {
  public readonly id: string;
  public amount: number;
  public type: 'income' | 'expense';
  public category: string;
  public description: string;
  public date: Date;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public tags?: string[];

  constructor(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = uuidv4();
    this.amount = data.amount;
    this.type = data.type;
    this.category = data.category;
    this.description = data.description;
    this.date = new Date(data.date);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.tags = data.tags;
  }

  public update(data: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>): void {
    if (data.amount !== undefined) this.amount = data.amount;
    if (data.type !== undefined) this.type = data.type;
    if (data.category !== undefined) this.category = data.category;
    if (data.description !== undefined) this.description = data.description;
    if (data.date !== undefined) this.date = new Date(data.date);
    if (data.tags !== undefined) this.tags = data.tags;
    this.updatedAt = new Date();
  }

  public toJSON(): Transaction {
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

  public static createFromDTO(dto: any): TransactionEntity {
    return new TransactionEntity(dto);
  }
}

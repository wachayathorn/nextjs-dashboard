import { IsNumber, IsString, IsEnum, IsOptional, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../../../shared/types';

export class CreateTransactionDto {
  @IsNumber()
  @Type(() => Number)
  amount!: number;

  @IsEnum(['income', 'expense'])
  type!: 'income' | 'expense';

  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

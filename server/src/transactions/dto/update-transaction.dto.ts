import { IsNumber, IsString, IsEnum, IsOptional, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTransactionDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  amount?: number;

  @IsEnum(['income', 'expense'])
  @IsOptional()
  type?: 'income' | 'expense';

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

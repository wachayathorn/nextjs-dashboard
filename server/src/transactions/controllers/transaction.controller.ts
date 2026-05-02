import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { StatisticsService } from '../services/statistics.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction, Statistics } from '../../../../shared/types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../../../shared/types';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get('statistics')
  async getStatistics(): Promise<Statistics> {
    return this.statisticsService.getStatistics();
  }

  @Get('categories')
  async getCategories(): Promise<{ income: string[], expense: string[] }> {
    return {
      income: [...INCOME_CATEGORIES],
      expense: [...EXPENSE_CATEGORIES],
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string, 
    @Body() updateTransactionDto: UpdateTransactionDto
  ): Promise<Transaction> {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.transactionService.delete(id);
  }

  @Get('filter/date-range')
  async findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ): Promise<Transaction[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.transactionService.findByDateRange(start, end);
  }

  @Get('filter/type/:type')
  async findByType(@Param('type') type: 'income' | 'expense'): Promise<Transaction[]> {
    return this.transactionService.findByType(type);
  }

  @Get('filter/category/:category')
  async findByCategory(@Param('category') category: string): Promise<Transaction[]> {
    return this.transactionService.findByCategory(category);
  }
}

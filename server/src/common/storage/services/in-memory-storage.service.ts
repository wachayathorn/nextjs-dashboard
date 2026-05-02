import { Injectable } from '@nestjs/common';
import { IStorageService } from '../interfaces/storage.interface';

@Injectable()
export class InMemoryStorageService<T> implements IStorageService<T> {
  private readonly storage = new Map<string, T>();

  save(key: string, value: T): void {
    this.storage.set(key, value);
  }

  get(key: string): T | undefined {
    return this.storage.get(key);
  }

  getAll(): Map<string, T> {
    return new Map(this.storage);
  }

  delete(key: string): boolean {
    return this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  keys(): string[] {
    return Array.from(this.storage.keys());
  }

  size(): number {
    return this.storage.size;
  }
}

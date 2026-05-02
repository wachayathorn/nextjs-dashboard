export interface IStorageService<T> {
  save(key: string, value: T): void;
  get(key: string): T | undefined;
  getAll(): Map<string, T>;
  delete(key: string): boolean;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
  size(): number;
}

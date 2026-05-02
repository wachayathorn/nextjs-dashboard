import { IStorageService } from '../interfaces/storage.interface';
export declare class InMemoryStorageService<T> implements IStorageService<T> {
    private readonly storage;
    save(key: string, value: T): void;
    get(key: string): T | undefined;
    getAll(): Map<string, T>;
    delete(key: string): boolean;
    clear(): void;
    has(key: string): boolean;
    keys(): string[];
    size(): number;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStorageService = void 0;
const common_1 = require("@nestjs/common");
let InMemoryStorageService = class InMemoryStorageService {
    constructor() {
        this.storage = new Map();
    }
    save(key, value) {
        this.storage.set(key, value);
    }
    get(key) {
        return this.storage.get(key);
    }
    getAll() {
        return new Map(this.storage);
    }
    delete(key) {
        return this.storage.delete(key);
    }
    clear() {
        this.storage.clear();
    }
    has(key) {
        return this.storage.has(key);
    }
    keys() {
        return Array.from(this.storage.keys());
    }
    size() {
        return this.storage.size;
    }
};
exports.InMemoryStorageService = InMemoryStorageService;
exports.InMemoryStorageService = InMemoryStorageService = __decorate([
    (0, common_1.Injectable)()
], InMemoryStorageService);
//# sourceMappingURL=in-memory-storage.service.js.map
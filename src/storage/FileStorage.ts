export interface FileStorage {
    save(key: string, data: Buffer): Promise<string>;
    delete(key: string): Promise<void>;
    get(key: string): Promise<Buffer>;
}
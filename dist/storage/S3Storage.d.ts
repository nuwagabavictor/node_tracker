import { FileStorage } from "./FileStorage";
export declare class S3Storage implements FileStorage {
    private readonly bucket;
    private client;
    save(key: string, data: Buffer): Promise<string>;
    delete(key: string): Promise<void>;
    get(key: string): Promise<Buffer>;
}
//# sourceMappingURL=S3Storage.d.ts.map
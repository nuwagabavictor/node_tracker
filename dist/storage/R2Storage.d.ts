import { FileStorage } from "./FileStorage";
export declare class R2Storage implements FileStorage {
    private readonly bucket;
    private client;
    save(key: string, data: Buffer): Promise<string>;
    delete(key: string): Promise<void>;
    get(key: string): Promise<Buffer>;
}
//# sourceMappingURL=R2Storage.d.ts.map
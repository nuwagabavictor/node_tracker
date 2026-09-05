import { FileStorage } from "./FileStorage";
export declare class FileSystemStorage implements FileStorage {
    private readonly root;
    save(key: string, data: Buffer): Promise<string>;
    delete(key: string): Promise<void>;
    get(key: string): Promise<Buffer>;
    private resolve;
}
//# sourceMappingURL=FilesSystemStorage.d.ts.map
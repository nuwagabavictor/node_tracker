import { StorageType } from "../enums/enum";
import { FileStorage } from "./FileStorage";
import { S3Storage } from "./S3Storage";
import { R2Storage } from "./R2Storage";
import { env } from "../config/env";
import {FileSystemStorage} from "./FilesSystemStorage";


export function getEnabledStorage(): StorageType {
    if (env.filesystemEnabled) return "FILESYSTEM";
    if (env.s3Enabled) return "S3";
    if (env.r2Enabled) return "R2";

    throw new Error("No storage provider enabled");
}

let cachedStorage: FileStorage | null = null;

export function createStorage(type: StorageType = getEnabledStorage()): FileStorage {
    switch (type) {
        case "FILESYSTEM":
            return new FileSystemStorage();
        case "S3":
            return new S3Storage();
        case "R2":
            return new R2Storage();
        default:
            throw new Error(`Unsupported storage type: ${type}`);
    }
}


export function getStorage(): FileStorage {
    if (!cachedStorage) {
        cachedStorage = createStorage();
    }
    return cachedStorage;
}

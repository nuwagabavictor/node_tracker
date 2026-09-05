"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnabledStorage = getEnabledStorage;
exports.createStorage = createStorage;
exports.getStorage = getStorage;
const S3Storage_1 = require("./S3Storage");
const R2Storage_1 = require("./R2Storage");
const env_1 = require("../config/env");
const FilesSystemStorage_1 = require("./FilesSystemStorage");
function getEnabledStorage() {
    if (env_1.env.filesystemEnabled)
        return "FILESYSTEM";
    if (env_1.env.s3Enabled)
        return "S3";
    if (env_1.env.r2Enabled)
        return "R2";
    throw new Error("No storage provider enabled");
}
let cachedStorage = null;
function createStorage(type = getEnabledStorage()) {
    switch (type) {
        case "FILESYSTEM":
            return new FilesSystemStorage_1.FileSystemStorage();
        case "S3":
            return new S3Storage_1.S3Storage();
        case "R2":
            return new R2Storage_1.R2Storage();
        default:
            throw new Error(`Unsupported storage type: ${type}`);
    }
}
function getStorage() {
    if (!cachedStorage) {
        cachedStorage = createStorage();
    }
    return cachedStorage;
}
//# sourceMappingURL=StorageFactory.js.map
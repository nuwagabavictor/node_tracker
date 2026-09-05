"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemStorage = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
class FileSystemStorage {
    root = path_1.default.join(env_1.env.filesystemLocation, "uploads");
    async save(key, data) {
        const location = this.resolve(key);
        await fs_1.promises.mkdir(path_1.default.dirname(location), { recursive: true });
        await fs_1.promises.writeFile(location, data);
        return key;
    }
    async delete(key) {
        await fs_1.promises.unlink(this.resolve(key));
    }
    async get(key) {
        return fs_1.promises.readFile(this.resolve(key));
    }
    resolve(key) {
        const target = path_1.default.resolve(this.root, key);
        if (!target.startsWith(this.root + path_1.default.sep) && target !== this.root) {
            throw new Error(`Invalid storage key: "${key}" escapes storage root`);
        }
        return target;
    }
}
exports.FileSystemStorage = FileSystemStorage;
//# sourceMappingURL=FilesSystemStorage.js.map
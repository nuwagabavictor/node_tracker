import { promises as fs } from "fs";
import path from "path";
import { FileStorage } from "./FileStorage";
import { env } from "../config/env";

export class FileSystemStorage implements FileStorage {

    private readonly root = path.join(env.filesystemLocation, "uploads");

    async save(key: string, data: Buffer): Promise<string> {
        const location = this.resolve(key);

        await fs.mkdir(path.dirname(location), { recursive: true });
        await fs.writeFile(location, data);

        return key;
    }

    async delete(key: string): Promise<void> {
        await fs.unlink(this.resolve(key));
    }

    async get(key: string): Promise<Buffer> {
        return fs.readFile(this.resolve(key));
    }


    private resolve(key: string): string {
        const target = path.resolve(this.root, key);

        if (!target.startsWith(this.root + path.sep) && target !== this.root) {
            throw new Error(`Invalid storage key: "${key}" escapes storage root`);
        }

        return target;
    }
}

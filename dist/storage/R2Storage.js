"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.R2Storage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("../config/env");
async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}
class R2Storage {
    bucket = env_1.env.r2Bucket;
    client = new client_s3_1.S3Client({
        region: "auto",
        endpoint: env_1.env.r2Endpoint,
        credentials: {
            accessKeyId: env_1.env.r2AccessKeyId,
            secretAccessKey: env_1.env.r2SecretAccessKey
        }
    });
    async save(key, data) {
        await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: data
        }));
        return key;
    }
    async delete(key) {
        await this.client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
        }));
    }
    async get(key) {
        const result = await this.client.send(new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: key
        }));
        if (!result.Body) {
            throw new Error(`Object not found: ${key}`);
        }
        return streamToBuffer(result.Body);
    }
}
exports.R2Storage = R2Storage;
//# sourceMappingURL=R2Storage.js.map
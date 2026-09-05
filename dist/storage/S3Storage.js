"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Storage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("../config/env");
async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}
class S3Storage {
    bucket = env_1.env.s3Bucket;
    client = new client_s3_1.S3Client({
        region: env_1.env.s3Region ?? "us-east-1",
        credentials: {
            accessKeyId: env_1.env.s3AccessKeyId,
            secretAccessKey: env_1.env.s3SecretAccessKey
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
exports.S3Storage = S3Storage;
//# sourceMappingURL=S3Storage.js.map
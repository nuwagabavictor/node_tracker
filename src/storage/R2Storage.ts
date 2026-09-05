import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";
import { FileStorage } from "./FileStorage";
import { env } from "../config/env";

async function streamToBuffer(stream: any): Promise<Buffer> {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}

export class R2Storage implements FileStorage {

    private readonly bucket = env.r2Bucket;

    private client = new S3Client({
        region: "auto",
        endpoint: env.r2Endpoint,
        credentials: {
            accessKeyId: env.r2AccessKeyId,
            secretAccessKey: env.r2SecretAccessKey
        }
    });

    async save(key: string, data: Buffer): Promise<string> {
        await this.client.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: data
            })
        );

        return key;
    }

    async delete(key: string): Promise<void> {
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key
            })
        );
    }

    async get(key: string): Promise<Buffer> {
        const result = await this.client.send(
            new GetObjectCommand({
                Bucket: this.bucket,
                Key: key
            })
        );

        if (!result.Body) {
            throw new Error(`Object not found: ${key}`);
        }

        return streamToBuffer(result.Body);
    }
}

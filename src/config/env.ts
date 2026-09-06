import 'dotenv/config'

function required(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback
    if (value === undefined) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    corsOrigins: (process.env.CORS_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean),

    dbHost: process.env.DB_HOST ?? 'localhost',
    dbUser: process.env.DB_USER ?? 'mobility', // mobility
    dbPass: process.env.DB_PASS ?? '',
    dbName: process.env.DB_NAME ?? 'bivas_mobility',
    dbPort: Number(process.env.DB_PORT ?? 3306),

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,

    jwtAccessTtl: process.env.JWT_ACCESS_TTL ?? "50m",

    jwtRefreshTtl: process.env.JWT_REFRESH_TTL ?? "30d",
    filesystemEnabled: process.env.FILESYSTEM_ENABLED === "true",
    filesystemLocation: process.env.FILESYSTEM_LOCATION ?? "./storage",

    s3Enabled: process.env.S3_ENABLED === "true",
    s3Bucket: process.env.S3_BUCKET!,
    s3Region: process.env.S3_REGION,
    s3AccessKeyId: process.env.S3_ACCESS_TOKEN!,
    s3SecretAccessKey: process.env.S3_SECRET!,

    r2Enabled: process.env.R2_ENABLED === "true",
    r2Bucket: process.env.R2_BUCKET!,
    r2Endpoint: process.env.R2_ENDPOINT!,
    r2AccessKeyId: process.env.R2_ACCESS_TOKEN!,
    r2SecretAccessKey: process.env.R2_SECRET!,
    emailHost: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
    emailPort: Number(process.env.EMAIL_PORT ?? 587),
    emailUser: process.env.EMAIL_USER ?? '',
    emailPass: process.env.EMAIL_PASS ?? '',
    secure: process.env.SMTP_SECURE === "true",
    smsSenderId: process.env.SMS_SENDER_ID ?? '',
    smsApiKey: process.env.SMS_API_KEY ?? '',
    smsUrl: process.env.SMS_URL ?? '',
}
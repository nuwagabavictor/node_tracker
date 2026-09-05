export declare const Roles: readonly ["ADMIN", "USER", "GUEST", "DRIVER", "OPERATOR", "COMPANY", "SUPER_ADMIN", "RIDER"];
export type UserRole = (typeof Roles)[number];
export declare const StorageTypes: readonly ["FILESYSTEM", "S3", "R2"];
export type StorageType = (typeof StorageTypes)[number];
export declare const KycSubjectTypes: readonly ["OPERATOR", "DRIVER", "COMPANY"];
export type KycSubjectType = typeof KycSubjectTypes[number];
export declare const KycDocumentTypes: readonly ["NATIONAL_ID", "PASSPORT", "DRIVERS_LICENSE", "PROOF_OF_ADDRESS", "SELFIE_WITH_ID", "VEHICLE_REGISTRATION", "VEHICLE_INSURANCE", "BUSINESS_REGISTRATION_CERT", "TAX_PIN_CERTIFICATE", "DIRECTOR_ID"];
export type KycDocumentType = typeof KycDocumentTypes[number];
export declare const KycProfileStatuses: readonly ["INCOMPLETE", "PENDING_REVIEW", "APPROVED", "REJECTED", "EXPIRED"];
export type KycProfileStatus = typeof KycProfileStatuses[number];
export declare const KycDocumentStatuses: readonly ["PENDING", "APPROVED", "REJECTED"];
export type KycDocumentStatus = typeof KycDocumentStatuses[number];
export declare const KYC_REQUIREMENTS: Record<KycSubjectType, KycDocumentType[]>;
//# sourceMappingURL=enum.d.ts.map
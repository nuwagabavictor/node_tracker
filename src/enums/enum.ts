export const Roles = [
    "ADMIN", "USER", "GUEST", "DRIVER", "OPERATOR", "COMPANY", "SUPER_ADMIN", "RIDER"
]as const

export type UserRole = (typeof Roles)[number]

export const StorageTypes = [
    "FILESYSTEM",
    "S3",
    "R2"
] as const;

export type StorageType = (typeof StorageTypes)[number];



export const KycSubjectTypes = ["OPERATOR", "DRIVER", "COMPANY"] as const;
export type KycSubjectType = typeof KycSubjectTypes[number];

export const KycDocumentTypes = [
    "NATIONAL_ID",
    "PASSPORT",
    "DRIVERS_LICENSE",
    "PROOF_OF_ADDRESS",
    "SELFIE_WITH_ID",
    "VEHICLE_REGISTRATION",
    "VEHICLE_INSURANCE",
    "BUSINESS_REGISTRATION_CERT",
    "TAX_PIN_CERTIFICATE",
    "DIRECTOR_ID"
] as const;
export type KycDocumentType = typeof KycDocumentTypes[number];

export const KycProfileStatuses = [
    "INCOMPLETE",      // not all required documents uploaded yet
    "PENDING_REVIEW",  // all required documents uploaded, awaiting a reviewer
    "APPROVED",        // every required document approved
    "REJECTED",        // at least one document rejected, waiting on resubmission
    "EXPIRED"          // profile passed its expiresAt date
] as const;
export type KycProfileStatus = typeof KycProfileStatuses[number];

export const KycDocumentStatuses = ["PENDING", "APPROVED", "REJECTED"] as const;
export type KycDocumentStatus = typeof KycDocumentStatuses[number];

// Which document types each subject type must provide. Edit this map to
// change requirements - nothing else in the KYC flow needs to change.
export const KYC_REQUIREMENTS: Record<KycSubjectType, KycDocumentType[]> = {
    DRIVER: ["NATIONAL_ID", "DRIVERS_LICENSE", "SELFIE_WITH_ID", "PROOF_OF_ADDRESS"],
    OPERATOR: ["VEHICLE_REGISTRATION", "VEHICLE_INSURANCE", "NATIONAL_ID"],
    COMPANY: ["BUSINESS_REGISTRATION_CERT", "TAX_PIN_CERTIFICATE", "DIRECTOR_ID"]
};


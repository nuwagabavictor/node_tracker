"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYC_REQUIREMENTS = exports.KycDocumentStatuses = exports.KycProfileStatuses = exports.KycDocumentTypes = exports.KycSubjectTypes = exports.StorageTypes = exports.Roles = void 0;
exports.Roles = [
    "ADMIN", "USER", "GUEST", "DRIVER", "OPERATOR", "COMPANY", "SUPER_ADMIN", "RIDER"
];
exports.StorageTypes = [
    "FILESYSTEM",
    "S3",
    "R2"
];
exports.KycSubjectTypes = ["OPERATOR", "DRIVER", "COMPANY"];
exports.KycDocumentTypes = [
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
];
exports.KycProfileStatuses = [
    "INCOMPLETE", // not all required documents uploaded yet
    "PENDING_REVIEW", // all required documents uploaded, awaiting a reviewer
    "APPROVED", // every required document approved
    "REJECTED", // at least one document rejected, waiting on resubmission
    "EXPIRED" // profile passed its expiresAt date
];
exports.KycDocumentStatuses = ["PENDING", "APPROVED", "REJECTED"];
// Which document types each subject type must provide. Edit this map to
// change requirements - nothing else in the KYC flow needs to change.
exports.KYC_REQUIREMENTS = {
    DRIVER: ["NATIONAL_ID", "DRIVERS_LICENSE", "SELFIE_WITH_ID", "PROOF_OF_ADDRESS"],
    OPERATOR: ["VEHICLE_REGISTRATION", "VEHICLE_INSURANCE", "NATIONAL_ID"],
    COMPANY: ["BUSINESS_REGISTRATION_CERT", "TAX_PIN_CERTIFICATE", "DIRECTOR_ID"]
};
//# sourceMappingURL=enum.js.map
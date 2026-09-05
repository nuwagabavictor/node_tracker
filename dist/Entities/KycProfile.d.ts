import { BaseEntity } from "typeorm";
import { KycProfileStatus, KycSubjectType } from "../enums/enum";
import { KycDocument } from "./KycDocument";
export declare class KycProfile extends BaseEntity {
    id: number;
    subjectType: KycSubjectType;
    subjectId: number;
    status: KycProfileStatus;
    rejectionReason?: string;
    reviewedAt?: Date;
    submittedAt?: Date;
    reviewedBy?: number;
    expiresAt?: Date;
    documents: KycDocument[];
    createdAt: Date;
    updatedAt: Date;
    static createKycProfile(subjectType: KycSubjectType, subjectId: number): KycProfile;
}
//# sourceMappingURL=KycProfile.d.ts.map
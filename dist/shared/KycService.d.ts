import { DocumentService } from "../shared/DocumentService";
import { KycDocumentType, KycSubjectType } from "../enums/enum";
import { KycProfile } from "../Entities/KycProfile";
import { KycDocument } from "../Entities/KycDocument";
export type KycChecklistItem = {
    documentType: KycDocumentType;
    status: "MISSING" | "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason?: string | null;
    documentId?: number;
};
export declare class KycService {
    private readonly documentService;
    constructor(documentService: DocumentService);
    getOrCreateProfile(subjectType: KycSubjectType, subjectId: number): Promise<KycProfile>;
    uploadDocument(subjectType: KycSubjectType, subjectId: number, documentType: KycDocumentType, fileBuffer: Buffer, file: {
        fileName: string;
        mimeType: string;
    }, submittedBy?: number): Promise<KycDocument>;
    reviewDocument(kycDocumentId: number, decision: "APPROVED" | "REJECTED", reviewerId: number, rejectionReason?: string): Promise<KycDocument>;
    getChecklist(subjectType: KycSubjectType, subjectId: number): Promise<KycChecklistItem[]>;
    private recomputeProfileStatus;
}
//# sourceMappingURL=KycService.d.ts.map
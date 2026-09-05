import { DocumentService } from "../shared/DocumentService";
import { KYC_REQUIREMENTS, KycDocumentType, KycSubjectType } from "../enums/enum";
import { KycProfile } from "../Entities/KycProfile";
import { KycDocument } from "../Entities/KycDocument";

export type KycChecklistItem =
    {
        documentType: KycDocumentType;
        status: "MISSING" | "PENDING" | "APPROVED" | "REJECTED";
        rejectionReason?: string | null;
        documentId?: number;
    };

export class KycService {

    constructor( private readonly documentService: DocumentService ) {}

    async getOrCreateProfile( subjectType: KycSubjectType, subjectId: number ): Promise<KycProfile> {
        let profile = await KycProfile.findOne({ where: { subjectType, subjectId } });

        if (!profile) {
            profile = KycProfile.createKycProfile(subjectType, subjectId);
            await profile.save();
        }

        return profile;
    }
    async uploadDocument( subjectType: KycSubjectType, subjectId: number, documentType: KycDocumentType, fileBuffer: Buffer, file: { fileName: string; mimeType: string; }, submittedBy?: number ): Promise<KycDocument> {
        const required = KYC_REQUIREMENTS[subjectType];

        if (!required.includes(documentType)) {
            throw new Error( `${documentType} is not required for ${subjectType}` );
        }
        const profile = await this.getOrCreateProfile( subjectType, subjectId );

        const storedDocument = await this.documentService.saveDocument( fileBuffer, {
            entityType: `KYC_${subjectType}`,
            entityId: subjectId,
            name: `${documentType} - ${subjectType} ${subjectId}`,
            fileName: file.fileName,
            description: `${subjectType}:${subjectId}`,
            mimeType: file.mimeType }
        );

        let kycDocument = await KycDocument.findOne({ where: { profile: { id: profile.id }, documentType },
            relations: ["document"] });

        if (!kycDocument) {
            kycDocument = KycDocument.createKycDocument( profile, documentType, storedDocument );
            kycDocument.submittedBy = submittedBy ?? null;
        } else {
            if (kycDocument.document) {
                await this.documentService.deleteDocument( kycDocument.document.id );
            }
            kycDocument.attachDocument( storedDocument, submittedBy );
        }

        await kycDocument.save();
        await this.recomputeProfileStatus(profile.id); return kycDocument;
    }

    async reviewDocument( kycDocumentId: number, decision: "APPROVED" | "REJECTED", reviewerId: number, rejectionReason?: string ): Promise<KycDocument> {
        const kycDocument = await KycDocument.findOne({ where: { id: kycDocumentId }, relations: ["profile", "document"] });
        if (!kycDocument) { throw new Error("KYC document not found"); }
        if (decision === "APPROVED") {
            kycDocument.approve(reviewerId);
        } else {
            kycDocument.reject( reviewerId, rejectionReason ?? "" );
        }
        await kycDocument.save();
        await this.recomputeProfileStatus( kycDocument.profile.id );
        return kycDocument;
    }

    async getChecklist( subjectType: KycSubjectType, subjectId: number ): Promise<KycChecklistItem[]> {
        const profile = await this.getOrCreateProfile( subjectType, subjectId );

        const submitted = await KycDocument.find({ where: { profile: { id: profile.id } },
            relations: ["document"]
        });

        const byType = new Map( submitted.map(d => [d.documentType, d]) );

        return KYC_REQUIREMENTS[subjectType].map(documentType => {
            const doc = byType.get(documentType);
            if (!doc) {
                return { documentType, status: "MISSING" as const };
            }
            return {
                documentType,
                status: doc.status,
                rejectionReason: doc.rejectionReason,
                documentId: doc.document?.id };
        });
    }

    private async recomputeProfileStatus( profileId: number ): Promise<void> {
        const profile = await KycProfile.findOneOrFail({ where: { id: profileId } });

        const checklist = await this.getChecklist( profile.subjectType, profile.subjectId );

        const statuses = checklist.map(c => c.status);

        if (statuses.every(s => s === "APPROVED")) {
            profile.status = "APPROVED"; profile.reviewedAt = new Date();
        } else if (statuses.includes("REJECTED")) {
            profile.status = "REJECTED";
        } else if (statuses.includes("MISSING")) {
            profile.status = "INCOMPLETE";
        } else {
            profile.status = "PENDING_REVIEW"; profile.submittedAt ??= new Date();
        }

        await profile.save();
    }

}
import {NextFunction, Response, Request} from "express";
import {z} from "zod";
import {DocumentService} from "../shared/DocumentService";

export const docShema = z.object({
    entityType: z.string(),
    entityId: z.number(),
    name: z.string(),
    description: z.string(),
})

type UploadRequest = Request & { file?: Express.Multer.File };

const documentService = new DocumentService();


export async function upload(req: UploadRequest, res: Response, next: NextFunction) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const body = docShema.parse(req.body);

        if (!body.entityType || !body.entityId || !body.name) {
            return res.status(400).json({ error: "entityType, entityId, and name are required" });
        }

        const document = await documentService.saveDocument(req.file.buffer, {
            entityType: body.entityType,
            entityId: Number(body.entityId),
            name: body.name,
            description: body.description,
            fileName: req.file.originalname,
            mimeType: req.file.mimetype
        });

        res.status(201).json(document);
    } catch (err) {
        next(err);
    }
}

export async function listAllDocuments(req: Request, res: Response, next: NextFunction) {
    try {
        const { entityType, entityId } = req.query;

        if (!entityType || !entityId) {
            return res.status(400).json({ error: "entityType and entityId query params are required" });
        }

        const documents = await documentService.getDocuments(String(entityType), Number(entityId));
        res.json(documents);
    } catch (err) {
        next(err);
    }
}

export async function getDocument(req: Request, res: Response, next: NextFunction) {
    try {
        const document = await documentService.getDocument(Number(req.params.id));
        res.json(document);
    } catch (err) {
        next(err);
    }
}

export async function downloadDocument(req: Request, res: Response, next: NextFunction) {
    try {
        const { document, data } = await documentService.getDocumentContent(Number(req.params.id));

        res.setHeader("Content-Type", document.mimeType);
        res.setHeader("Content-Disposition", `attachment; filename="${document.fileName}"`);
        res.send(data);
    } catch (err) {
        next(err);
    }
}

export async function deleteDocument(req: Request, res: Response, next: NextFunction) {
    try {
        await documentService.deleteDocument(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
import {Request, Response,NextFunction} from "express";
import {GlobalConfiguration} from "../Entities/GlobalConfiguration";
import {z} from "zod";

export const updateRequest = z.object({
    enabled: z.boolean(),
    stringValue: z.string(),
})

export async function updateConfiguration(req: Request, res: Response, next: NextFunction){
    try {

        const id = Number(req.params.id);

        const body = updateRequest.parse(req.body);

        const configuration = await GlobalConfiguration.findOne({where: {id: id}});

        if(!configuration) throw new Error("Configuration not found");

        const changes = configuration.changes({enabled: body.enabled, stringValue: body.stringValue});

        if (Object.keys(changes).length > 0){
            await configuration.save();
        }

        res.status(200).json({
            message: "Configuration updated",
            changes: changes,
        })


    }catch (e) {
        next(e)
    }
}

export async function findConfiguration(req: Request, res: Response, next: NextFunction){
    try {

        const id = Number(req.params.id);
        const userId = Number(req.user?.id);

        const config = await GlobalConfiguration.findOne({where: {id: id, userId: userId}});

        if(!config) throw new Error("Configuration not found");

        const data = {
            id: config.id,
            name: config.name,
            enabled: config.enabled,
            stringValue: config.stringValue,
            createdAt: config.createdAt,
        }

        res.status(200).json({
            configuration: data,
        })


    }catch (e) {
        next(e)
    }
}

export async function findAllConfigurations(req: Request, res: Response, next: NextFunction){
    try {

        const userId = Number(req.user?.id);

        const configs = await GlobalConfiguration.find({
                where: {
                    userId: userId
                },
                order: {
                    id: "DESC"
                }
            }
        );


        const data = configs.map(config => ({
            id: config.id,
            name: config.name,
            enabled: config.enabled,
            stringValue: config.stringValue,
            createdAt: config.createdAt,
        }))

        res.status(200).json({
            configuration: data,
        })


    }catch (e) {
        next(e)
    }
}
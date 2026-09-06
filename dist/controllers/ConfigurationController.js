"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequest = void 0;
exports.updateConfiguration = updateConfiguration;
exports.findConfiguration = findConfiguration;
exports.findAllConfigurations = findAllConfigurations;
const GlobalConfiguration_1 = require("../Entities/GlobalConfiguration");
const zod_1 = require("zod");
exports.updateRequest = zod_1.z.object({
    enabled: zod_1.z.boolean(),
    stringValue: zod_1.z.string(),
});
async function updateConfiguration(req, res, next) {
    try {
        const id = Number(req.params.id);
        const body = exports.updateRequest.parse(req.body);
        const configuration = await GlobalConfiguration_1.GlobalConfiguration.findOne({ where: { id: id } });
        if (!configuration)
            throw new Error("Configuration not found");
        const changes = configuration.changes({ enabled: body.enabled, stringValue: body.stringValue });
        if (Object.keys(changes).length > 0) {
            await configuration.save();
        }
        res.status(200).json({
            message: "Configuration updated",
            changes: changes,
        });
    }
    catch (e) {
        next(e);
    }
}
async function findConfiguration(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.user?.id);
        const config = await GlobalConfiguration_1.GlobalConfiguration.findOne({ where: { id: id, userId: userId } });
        if (!config)
            throw new Error("Configuration not found");
        const data = {
            id: config.id,
            name: config.name,
            enabled: config.enabled,
            stringValue: config.stringValue,
            createdAt: config.createdAt,
        };
        res.status(200).json({
            configuration: data,
        });
    }
    catch (e) {
        next(e);
    }
}
async function findAllConfigurations(req, res, next) {
    try {
        const userId = Number(req.user?.id);
        const configs = await GlobalConfiguration_1.GlobalConfiguration.find({
            where: {
                userId: userId
            },
            order: {
                id: "DESC"
            }
        });
        const data = configs.map(config => ({
            id: config.id,
            name: config.name,
            enabled: config.enabled,
            stringValue: config.stringValue,
            createdAt: config.createdAt,
        }));
        res.status(200).json({
            configuration: data,
        });
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=ConfigurationController.js.map
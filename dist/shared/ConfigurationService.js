"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const GlobalConfiguration_1 = require("../Entities/GlobalConfiguration");
const GlobalConstants_1 = require("../constants/GlobalConstants");
class ConfigurationService {
    async createDefaults(user) {
        const configurations = [
            GlobalConfiguration_1.GlobalConfiguration.createConfig({
                name: GlobalConstants_1.GlobalConstants.ENABLE_DAILY_EMAIL_REMAINDER,
                user,
            }),
            GlobalConfiguration_1.GlobalConfiguration.createConfig({
                user,
                name: GlobalConstants_1.GlobalConstants.ENABLE_TWO_FACTOR_AUTH,
            })
        ];
        await GlobalConfiguration_1.GlobalConfiguration.save(configurations);
    }
}
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=ConfigurationService.js.map
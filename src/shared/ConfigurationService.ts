import {User} from "../Entities/User";
import {GlobalConfiguration} from "../Entities/GlobalConfiguration";
import {GlobalConstants} from "../constants/GlobalConstants";

export class ConfigurationService {

    async createDefaults(user: User): Promise<void> {

        const configurations = [
            GlobalConfiguration.createConfig({
                name: GlobalConstants.ENABLE_DAILY_EMAIL_REMAINDER,
                user,
            }),

            GlobalConfiguration.createConfig({
                user,
                name: GlobalConstants.ENABLE_TWO_FACTOR_AUTH,
            })
        ];

        await GlobalConfiguration.save(configurations);
    }
}
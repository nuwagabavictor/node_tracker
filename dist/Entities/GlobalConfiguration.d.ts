import { BaseEntity } from "typeorm";
import { User } from "./User";
export declare class GlobalConfiguration extends BaseEntity {
    id: number;
    name: string;
    stringValue?: string;
    user: User;
    userId: number;
    enabled: boolean;
    systemGenerated: boolean;
    createdAt: Date;
    updatedAt: Date;
    static createConfig(params: {
        name: string;
        stringValue?: string;
        user: User;
    }): GlobalConfiguration;
    changes(data: {
        enabled?: boolean;
        stringValue?: string;
    }): Record<string, any>;
}
//# sourceMappingURL=GlobalConfiguration.d.ts.map
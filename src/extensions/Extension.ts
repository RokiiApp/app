import { ExtensionContext } from "./types";

export class Extension {
    icon: string;
    name: string;
    run: (context: ExtensionContext) => Promise<void>;
    settings?: any;
    initialize?: (...args: any[]) => void;
    initializeAsync?: (...args: any[]) => Promise<void>;
    onMessage?: (data: unknown) => void;

    constructor(module: any) {
        // TODO - check if the module is a valid extension (use ZOD?)

        if (!this.isValidExtension(module)) {
            throw new Error("Invalid extension module");
        }

        this.icon = module.icon;
        this.name = module.name;
        this.run = module.run;
        this.settings = module.settings;
        this.initialize = module.initialize;
        this.initializeAsync = module.initializeAsync;
        this.onMessage = module.onMessage;
    }

    private isValidExtension(module: any): module is Extension {
        return module.icon && module.name && module.run;
    }
}

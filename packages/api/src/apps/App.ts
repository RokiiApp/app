import { ExtensionContext } from "..";

export type App<T = any> = {
    id: string;
    run: (context: ExtensionContext, ownContext: T) => Promise<void>;
    onAppStart?: (settings: Record<string, any>) => Promise<T>;
}

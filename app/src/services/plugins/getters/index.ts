import { getCoreExtensions } from "./getCoreExtensions";
import { getExternalExtensions } from "./getExternalExtensions";
import { Extension } from "@/extensions/Extension";

export type ExtensionGetter = () => Promise<Extension[]>;

export {
    getCoreExtensions,
    getExternalExtensions,
}


import { coreExtensions } from "@/extensions/core";
import { Extension } from "@/extensions/Extension";
import { ExtensionGetter } from ".";

export const getCoreExtensions: ExtensionGetter = async () => {
    const extensions: Extension[] = []

    const extensionModules = Object.values(coreExtensions);

    for (const [key, module] of Object.entries(extensionModules)) {
        try {
            const extension = new Extension(module);
            extensions.push(extension);
        } catch (error) {
            console.error(`Error loading core extension: ${key}`, error);
        }
    }

    return extensions;
}

import { PLUGINS_PATH } from "@/common/constants/paths";
import { join } from "@tauri-apps/api/path";
import { ExternalModuleImporter } from "@/services/ExternalModuleImporter";
import { Extension } from "@/extensions/Extension";

const ExtensionModuleImporter = {
    /**
     * Requires an extension from the plugins folder,
     * and returns an instance of the extension
     *
     * This method is always safe to call, and will never throw an error
     * If the plugin is not found, or if there is an error loading the plugin,
     * it will return null, but will not throw an error
     */
    get: async (extensionName: string) => {
        const pluginPath = await join(
            PLUGINS_PATH,
            extensionName,
            "dist",
            "index.js"
        );

        const forceCacheBust = true;

        try {
            const module = await ExternalModuleImporter.import(
                pluginPath,
                forceCacheBust
            );

            const extension = new Extension(module.default);

            return extension;
        } catch (error) {
            console.error(
                `[ExtensionModuleImporter] - Error loading plugin: ${extensionName}`,
                error
            );
            return null;
        }
    },
};

Object.freeze(ExtensionModuleImporter);

export { ExtensionModuleImporter };

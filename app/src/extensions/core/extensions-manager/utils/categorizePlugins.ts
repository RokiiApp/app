import { PluginInfo } from "../types";

export const categorizePlugins = (plugins: PluginInfo[]) => {
    // ref https://github.com/microsoft/TypeScript/issues/47171
    // @ts-ignore
    const grouped = Object.groupBy(plugins, (plugin: PluginInfo) => {
        if (plugin.isDebugging) return '🐛 Debugging';
        if (plugin.isUpdateAvailable) return '🆕 Updates';
        if (plugin.isInstalled) return '💫 Installed';
        if (plugin.name) return '🔎 Available';
    })

    const result: (PluginInfo | string)[] = [];

    Object.entries(grouped).forEach(([category, plugins]) => {
        // @ts-ignore
        result.push(category, ...plugins);
    })

    return result;
};

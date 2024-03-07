import { PluginInfo } from "../types";

export const categorizePlugins = (plugins: PluginInfo[]) => {
    const grouped = Object.groupBy(plugins, (plugin: PluginInfo) => {
        if (plugin.isDebugging) return '🐛 Debugging';
        if (plugin.isUpdateAvailable) return '🆕 Updates';
        if (plugin.isInstalled) return '💫 Installed';
        if (plugin.name) return '🔎 Available';
        return '🔌 Other';
    });

    const result: (PluginInfo | string)[] = [];

    Object.entries(grouped).forEach(([category, plugins]) => {
        result.push(category, ...plugins);
    })

    return result;
};

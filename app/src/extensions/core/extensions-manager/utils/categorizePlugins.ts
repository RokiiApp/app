import { ExtensionInfo } from "../types";

export const categorizeExtensions = (plugins: ExtensionInfo[]) => {
    const grouped = Object.groupBy(plugins, (extension) => {
        if (extension.isDebugging) return '🐛 Debugging';
        if (extension.updateAvailable) return '🆕 Update available';
        if (extension.isInstalled) return '💫 Installed';
        if (extension.name) return '🔎 Available';
        return '🔌 Other';
    });

    return grouped;
};

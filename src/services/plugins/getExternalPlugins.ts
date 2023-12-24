import { PLUGINS_PACKAGE_JSON_PATH, PLUGINS_PATH } from '@/common/constants/paths';
import { readTextFile, readDir } from '@tauri-apps/api/fs';

export const getExternalPlugins = async () => {
    try {
        const allPlugins = await getPotentialPluginsInFolder();
        return allPlugins;
    } catch (err) {
        console.log(err);
        return [];
    }
}

/**
 * @returns The names of the folders that are in the plugins folder. These are the potential plugins.
 */
const getPotentialPluginsInFolder = async () => {
    const files = await readDir(PLUGINS_PATH)
    const potentialPlugins = files.filter(file => file.children)

    return potentialPlugins.map(plugin => plugin.name)
}

/**
 * @returns The names and versions of the plugins present in the package.json file in the plugins folder.
 * 
 * ⚠️ This plugin returns scoped names like `@example/plugin`. Just like they are in the package.json
 */
export const getInstalledPluginsAndVersions = async () => {
    try {
        const pkgJson = await readTextFile(PLUGINS_PACKAGE_JSON_PATH)

        const plugins = JSON.parse(pkgJson).dependencies as Record<string, string>

        return plugins;
    } catch (err) {
        console.log(err);
        return {};
    }
}

export const getInstalledPluginNames = async () => {
  try {
    const pkgJson = await readTextFile(PLUGINS_PACKAGE_JSON_PATH)

    const plugins = JSON.parse(pkgJson).dependencies as Record<string, string>

    const pluginNames = Object.keys(plugins).map(pluginName => pluginName.replace(/^@.+?\//, ''))

    return pluginNames;
  } catch (err) {
    console.log(err);
    return [];
  }
};

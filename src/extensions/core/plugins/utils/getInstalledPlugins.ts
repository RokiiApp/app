import { pluginsManager } from '@/extensions/PluginsManager';
import { getInstalledPluginsAndVersions } from '@/services/plugins/getExternalPlugins';

/**
 * Get list of all installed plugins with versions
 */
export const getInstalledPlugins = async () => {
  const plugins = pluginsManager.getAllPlugins();
  const installedPluginNames = await getInstalledPluginsAndVersions();

  const result = Object.entries(installedPluginNames).map(([pluginName, installedVersion]) => {
    return {
      ...plugins[pluginName],
      name: pluginName,
      version: installedVersion
    };
  });

  return result;
};

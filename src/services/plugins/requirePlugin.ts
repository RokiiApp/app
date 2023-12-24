import type { PluginModule } from '@rokii/types';
import { PLUGINS_PATH } from '@/common/constants/paths';
import { join } from '@tauri-apps/api/path';
import { ExternalModuleImporter } from '@/services/ExternalModuleImporter';

export const requirePlugin = async (pluginName: string) => {
    const pluginPath = await join(PLUGINS_PATH, pluginName, "dist", "index.js")
  
    try {
      const { module: plugin, error } = await ExternalModuleImporter.importModule(pluginPath);
  
      if (error) throw error
  
      // Fallback for plugins with structure like `{default: {fn: ...}}`
      const keys = Object.keys(plugin);
      if (keys.length === 1 && keys.includes('default')) {
        if (!isPluginValid(plugin.default)) return null;
        return plugin.default as PluginModule;
      }
  
      if (isPluginValid(plugin)) return plugin;
  
      return null;
    } catch (error) {
      // catch all errors from plugin loading
      console.log('Error requiring', pluginPath);
      console.log(error);
  
      return null;
    }
  };

  /**
 * Validate plugin module signature
 */
export const isPluginValid = (plugin: PluginModule): plugin is PluginModule =>
plugin &&
// Check existing of main plugin function
typeof plugin.fn === 'function' &&
// Check that plugin function accepts 0 or 1 argument
plugin.fn.length <= 1;

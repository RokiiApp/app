import type { Extension } from '@/extensions/types';
import { PLUGINS_PATH } from '@/common/constants/paths';
import { join } from '@tauri-apps/api/path';
import { ExternalModuleImporter } from '@/services/ExternalModuleImporter';

export const requirePlugin = async (pluginName: string) => {
  const pluginPath = await join(PLUGINS_PATH, pluginName, "dist", "index.js")

  try {
    const { module: extension, error } = await ExternalModuleImporter.importModule(pluginPath);

    if (error) throw error

    // Fallback for plugins with structure like `{default: {fn: ...}}`
    const keys = Object.keys(extension);
    if (keys.length === 1 && keys.includes('default')) {
      if (!isPluginValid(extension.default)) return null;
      return extension.default as Extension;
    }

    if (isPluginValid(extension)) return extension;

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
export const isPluginValid = (module: any): module is Extension =>
  module &&
  // Check existing of main plugin function
  typeof module.fn === 'function' &&
  // Check that plugin function accepts 0 or 1 argument
  module.fn.length <= 1;

import { PLUGINS_PATH } from '@/common/constants/paths';
import { join } from '@tauri-apps/api/path';
import { ExternalModuleImporter } from '@/services/ExternalModuleImporter';
import { Extension } from '@/extensions/Extension';

export const requireExtension = async (pluginName: string): Promise<Extension | null> => {
  const pluginPath = await join(PLUGINS_PATH, pluginName, "dist", "index.js")

  try {
    const { module, error } = await ExternalModuleImporter.importModule(pluginPath);

    if (error) throw error

    const extension = new Extension(module)

    return extension;
  } catch (error) {
    // catch all errors from plugin loading
    console.log('Error requiring', pluginPath);
    console.log(error);

    return null;
  }
};


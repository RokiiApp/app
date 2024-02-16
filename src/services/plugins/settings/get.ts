import type { Extension } from '@/extensions/Extension';
import * as config from '@/common/config';

/**
 * Returns the settings established by the user and previously saved in the config file
 * @param pluginName The name entry of the plugin package.json
 * @returns An object with keys and values of the **stored** plugin settings
 */
const getExistingSettings = (pluginName: string) => config.get('plugins')[pluginName] || {};

/**
 * Returns the sum of the default settings and the user settings
 * We use packageJsonName to avoid conflicts with plugins that export
 * a different name from the bundle. Two plugins can export the same name
 * but can't have the same package.json name
 * @returns An object with keys and values of the plugin settings
 */
const getUserSettings = (extension: Extension, packageJsonName: string) => {
  const userSettings: Record<string, any> = {};

  const existingSettings: Record<string, any> =
    getExistingSettings(packageJsonName);
  const { settings: pluginSettings } = extension;

  if (pluginSettings) {
    // Provide default values if nothing is set by user
    Object.keys(pluginSettings).forEach((key) => {
      userSettings[key] =
        existingSettings[key] || pluginSettings[key].defaultValue;
    });
  }

  return userSettings;
};

export default getUserSettings;

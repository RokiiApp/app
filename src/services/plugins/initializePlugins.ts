import type { PluginModule } from '@rokii/types';

import { pluginSettings } from '@/services/plugins';

export const initPlugin = async (plugin: PluginModule, name: string) => {
  const { initialize, initializeAsync, onMessage } = plugin;

  // Foreground plugin initialization
  if (initialize) {
    console.log('Initialize sync plugin', name);

    try {
      initialize(pluginSettings.getUserSettings(plugin, name));
    } catch (e) {
      console.error(`Failed to initialize plugin: ${name}`, e);
    }
  }

  // Background plugin initialization
  if (initializeAsync) {
    console.log(`[initializeAsync:${name}] - Calling initializeAsync function`);

    initializeAsync((data: unknown) => {
      console.log(`[initializeAsync:${name}] - Calling onMessage function`);

      if (onMessage) onMessage(data);

    }, pluginSettings.getUserSettings(plugin, name));
  }
};

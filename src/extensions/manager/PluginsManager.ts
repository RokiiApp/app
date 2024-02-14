import { PluginModule } from '@rokii/types';
import { TypedEventTarget } from 'typescript-event-target';

import { corePlugins } from '../core';
import { initPlugin } from '@/services/plugins/initializePlugins';
import { getInstalledPluginNames } from '@/services/plugins/getExternalPlugins';
import { requirePlugin } from '@/services/plugins/requirePlugin';
import { ensureRokiNeededFiles } from '@/services/plugins';
import { setupPluginsWatcher } from '@/services/plugins/externalPluginsWatcher';
import { PluginEvents, PluginLoadedEvent, PluginRemovedEvent, PluginsManagerEvents } from './types';
export * from './types';

class PluginsManager extends TypedEventTarget<PluginsManagerEvents> {
  private plugins: Record<string, PluginModule> = {};

  async initManager() {
    await ensureRokiNeededFiles();
    await this.initializePlugins();
    await setupPluginsWatcher();
  }

  getCorePlugins() {
    return corePlugins;
  }

  async initializePlugins() {
    // Load the core plugins (the ones that come with rokii)
    const corePlugins = this.getCorePlugins()
    Object.keys(corePlugins).forEach((name) => this.loadCorePlugin(corePlugins[name], name));

    // load current downloaded plugins
    getInstalledPluginNames().then(installedPlugins => {
      installedPlugins.forEach((pluginName) => this.loadExternalPlugin(pluginName));
    });

  }

  async requestPluginLoad(name: string) {
    await this.loadExternalPlugin(name);
  }

  getPlugin(name: string) {
    return this.plugins[name];
  }

  deletePlugin(name: string) {
    delete this.plugins[name];

    this.dispatchTypedEvent(PluginEvents.REMOVED, new PluginRemovedEvent(name));
  }

  getAllPlugins() {
    return this.plugins;
  }

  private async loadCorePlugin(pluginModule: PluginModule, name: string) {
    await initPlugin(pluginModule, name);

    this.plugins[name] = pluginModule;

    this.dispatchTypedEvent(PluginEvents.LOADED, new PluginLoadedEvent(name));
  }

  private async loadExternalPlugin(name: string) {
    const plugin = await requirePlugin(name);

    if (!plugin) return;

    await initPlugin(plugin, name);

    this.plugins[name] = plugin;

    this.dispatchTypedEvent(PluginEvents.LOADED, new PluginLoadedEvent(name));
  }

}

const pluginsManager = new PluginsManager();
await pluginsManager.initManager();

export { pluginsManager };

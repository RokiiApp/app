import { TypedEventTarget } from 'typescript-event-target';

import { coreExtensions } from '../core';
import { initExtension } from '@/services/plugins/initializeExtensions';
import { getInstalledPluginNames } from '@/services/plugins/getExternalPlugins';
import { requireExtension } from '@/services/plugins/requireExtension';
import { ensureRokiNeededFiles } from '@/services/plugins';
import { setupPluginsWatcher } from '@/services/plugins/externalPluginsWatcher';
import { ExtensionEvents, ExtensionLoadedEvent, ExtensionRemovedEvent, PluginsManagerEvents } from './types';
import type { Extension } from '../Extension';
export * from './types';

class ExtensionsManager extends TypedEventTarget<PluginsManagerEvents> {
  private extensions: Record<string, Extension> = {};

  async initManager() {
    await ensureRokiNeededFiles();
    await this.initializePlugins();
    await setupPluginsWatcher();
  }

  getCoreExtensions() {
    return coreExtensions;
  }

  async initializePlugins() {
    // Load the core plugins (the ones that come with rokii)
    const corePlugins = this.getCoreExtensions()
    Object.keys(corePlugins).forEach((name) => this.loadCoreExtension(coreExtensions[name], name));

    // load current downloaded plugins
    getInstalledPluginNames().then(installedPlugins => {
      installedPlugins.forEach((pluginName) => this.loadExternalPlugin(pluginName));
    });

  }

  async requestPluginLoad(name: string) {
    await this.loadExternalPlugin(name);
  }

  getPlugin(name: string) {
    return this.extensions[name];
  }

  deletePlugin(name: string) {
    delete this.extensions[name];

    this.dispatchTypedEvent(ExtensionEvents.REMOVED, new ExtensionRemovedEvent(name));
  }

  getAllPlugins() {
    return this.extensions;
  }

  private async loadCoreExtension(extension: Extension, name: string) {
    await initExtension(extension, name);

    this.extensions[name] = extension;

    this.dispatchTypedEvent(ExtensionEvents.LOADED, new ExtensionLoadedEvent(name));
  }

  private async loadExternalPlugin(name: string) {
    const extension = await requireExtension(name);

    if (!extension) return;

    await initExtension(extension, name);

    this.extensions[name] = extension;

    this.dispatchTypedEvent(ExtensionEvents.LOADED, new ExtensionLoadedEvent(name));
  }

}

const extensionsManager = new ExtensionsManager();
await extensionsManager.initManager();

export { extensionsManager };

import { AppItem, ExtensionModule } from '@rokii/api'
import icon from '../icon.png'
import { PluginInfo } from './types';
import { initializeAsync } from './initializeAsync'
import { categorizePlugins } from './utils/categorizePlugins';
import { pluginToResult } from './utils/pluginToResult';

let plugins: PluginInfo[] = []

const onMessage: ExtensionModule['onMessage'] = async (message) => {
  plugins = message as PluginInfo[]
}

const managerLauncherAction = new AppItem({ title: 'Manage plugins', appName: 'Manager', icon })
export const fn: ExtensionModule['run'] = async ({ display }) => {
  display([managerLauncherAction])
}

const ExtensionsManagerApp: ExtensionModule["run"] = async ({ display }) => {
  const categorizeResult = categorizePlugins(plugins);

  const orderedPlugins = categorizeResult.map(pluginToResult);

  display(orderedPlugins)
}

const ExtensionsManagerExtension: ExtensionModule = {
  name: 'Extensions Manager',
  icon,
  initializeAsync,
  run: fn,
  onMessage,
  apps: {
    Manager: ExtensionsManagerApp
  }
}

export default ExtensionsManagerExtension

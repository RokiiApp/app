import { AppItem, ExtensionModule, Item } from '@rokii/api'
import icon from '../icon.png'
import { PluginInfo } from './types';
import { initializeAsync } from './initializeAsync'
import { categorizePlugins } from './utils/categorizePlugins';
import { pluginToResult } from './utils/pluginToResult';

let plugins: PluginInfo[] = []

const ExtensionsManagerApp: ExtensionModule["run"] = async ({ display }) => {
  const categorizeResult = categorizePlugins(plugins);

  const results: Item[] = []

  for (let [category, plugins] of Object.entries(categorizeResult) ){
    const resultsForCategory = plugins.map(plugin => pluginToResult(plugin, category))
    results.push(...resultsForCategory)
  }

  display(results)
}

const extensionAppName = "Manager"
const managerLauncherAction = new AppItem({ title: 'Manage extensions', appName: extensionAppName, icon })

const ExtensionsManagerExtension: ExtensionModule = {
  name: 'Extensions',
  icon,
  initializeAsync,
  run: ({ display }) => display([managerLauncherAction]),
  onMessage: (message) => plugins = message as PluginInfo[],
  apps: {
    [extensionAppName]: ExtensionsManagerApp
  }
}

export default ExtensionsManagerExtension

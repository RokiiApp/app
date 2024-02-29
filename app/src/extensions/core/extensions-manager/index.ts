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

const ExtensionsManagerApp: ExtensionModule["run"] = async ({ display }) => {
  const categorizeResult = categorizePlugins(plugins);

  const orderedPlugins = categorizeResult.map(pluginToResult);

  display(orderedPlugins)
}

const extensionAppName = "Manager"
const managerLauncherAction = new AppItem({ title: 'Manage extensions', appName: extensionAppName, icon })

const ExtensionsManagerExtension: ExtensionModule = {
  name: 'Extensions',
  icon,
  initializeAsync,
  run: ({ display }) => display([managerLauncherAction]),
  onMessage,
  apps: {
    [extensionAppName]: ExtensionsManagerApp
  }
}

export default ExtensionsManagerExtension

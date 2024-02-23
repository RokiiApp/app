import { AppItem, InfoItem, ExtensionModule, ScriptItem } from '@rokii/api'
import { client } from '@/services/plugins'
import { getPlugins } from './utils/loadPlugins'
import icon from '../icon.png'
import { PluginInfo } from './types';
import * as format from './utils/format';

const pluginToResult = (plugin: PluginInfo | string): ScriptItem => {
  if (typeof plugin === 'string') {
    return new ScriptItem({
      title: plugin,
      id: plugin,
      run: () => {
        client.installPackage(plugin)
      }
    })
  };

  const title = `${format.name(plugin.name)}`;
  const subtitle = format.version(plugin);

  return new ScriptItem({
    title,
    subtitle,
    id: plugin.name,
    run: () => {
      client.installPackage(plugin.name)
    }
  })
};

const categorizePlugins = (plugins: PluginInfo[]) => {

  // ref https://github.com/microsoft/TypeScript/issues/47171
  // @ts-ignore
  const grouped = Object.groupBy(plugins, (plugin: PluginInfo) => {
    if (plugin.isDebugging) return '🐛 Debugging';
    if (plugin.isUpdateAvailable) return '🆕 Updates';
    if (plugin.isInstalled) return '💫 Installed';
    if (plugin.name) return '🔎 Available';
  })

  const result: (PluginInfo | string)[] = [];

  Object.entries(grouped).forEach(([category, plugins]) => {
    // @ts-ignore
    result.push(category, ...plugins);
  })

  return result;
};

const managerLauncherAction = new AppItem({ title: 'Manage plugins', appName: 'Manager', icon })
export const fn: ExtensionModule['run'] = async ({ display }) => {
  display([managerLauncherAction])
}

const TEMPORAL_ACTION_ID = 'plugins-loading'
const temporalSearchAction = new InfoItem({
  title: 'Looking for plugins...',
  id: TEMPORAL_ACTION_ID
})
const ExtensionsManager: ExtensionModule["run"] = async ({ display, hide }) => {
  display([temporalSearchAction])
  const plugins = await getPlugins()

  console.log(plugins)
  const categorizeResult = categorizePlugins(plugins);
  const orderedPlugins = categorizeResult.map((plugin) =>
    pluginToResult(plugin)
  );
  hide(TEMPORAL_ACTION_ID)
  display(orderedPlugins)
}

const ExtensionsManagerExtension: ExtensionModule = {
  name: 'Extensions Manager',
  icon,
  run: fn,
  apps: {
    Manager: ExtensionsManager
  }
}

export default ExtensionsManagerExtension

export { initializeAsync } from './initializeAsync'

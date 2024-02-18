import type { Action, ExtensionModule /* ExtensionContext */ } from '@/extensions/types'
// import type { PluginInfo } from './types';
// import { search } from '@rokii/utils';

// import { open } from '@tauri-apps/api/shell';

import { getPlugins } from './utils/loadPlugins'

import icon from '../icon.png'
// import * as format from './utils/format';
// import { Preview } from './Preview';

// import { CHANNELS } from '@/common/constants/events';
// import { send } from '@/common/ipc';

// const updatePlugin = async (update: ExtensionContext['update'], name: string) => {
//   const plugins = await getPlugins();

//   // TODO: This is a hack to get the updated plugin- need to find a better way
//   const updatedPlugin = plugins.find((plugin) => plugin.name === name)!;

//   const title = `${format.name(updatedPlugin.name)}`;

//   send(CHANNELS.FocusInput)

//   update(name, {
//     title,
//     subtitle: format.version(updatedPlugin),
//     getPreview: () => (
//       <Preview
//         plugin={updatedPlugin}
//         key={name}
//         onComplete={() => updatePlugin(update, name)}
//       />
//     )
//   });
// };

// const pluginToResult = (plugin: PluginInfo | string, update: ExtensionContext['update']) => {
//   if (typeof plugin === 'string') return { title: plugin, icon: null };

//   const title = `${format.name(plugin.name)}`;
//   const subtitle = format.version(plugin);
//   const repoLink = plugin.repo;

//   const onSelect = repoLink ? () => open(repoLink) : undefined;

//   return {
//     icon: null,
//     id: plugin.name,
//     title,
//     subtitle,
//     onSelect,
//     getPreview: () => (
//       <Preview
//         plugin={plugin}
//         key={plugin.name}
//         onComplete={() => updatePlugin(update, plugin.name)}
//       />
//     )
//   };
// };

// const categorizePlugins = (plugins: PluginInfo[]) => {

//   // ref https://github.com/microsoft/TypeScript/issues/47171
//   // @ts-ignore
//   const grouped = Object.groupBy(plugins, (plugin: PluginInfo) => {
//     if (plugin.isDebugging) return '🐛 Debugging';
//     if (plugin.isUpdateAvailable) return '🆕 Updates';
//     if (plugin.isInstalled) return '💫 Installed';
//     if (plugin.name) return '🔎 Available';
//   })

//   const result: (PluginInfo | string)[] = [];

//   Object.entries(grouped).forEach(([category, plugins]) => {
//     // @ts-ignore
//     result.push(category, ...plugins);
//   })

//   return result;
// };

const managerLauncherAction: Action = {
  title: 'Manage plugins',
  type: 'app',
  appName: 'Manager'
}
const TEMPORAL_ACTION_ID = 'plugins-loading'

const temporalSearchAction: Action = {
  title: 'Looking for plugins...',
  type: 'info',
  id: TEMPORAL_ACTION_ID
}

const testAppAction: Action = {
  title: 'We are here!',
  type: 'info'
}

export const fn: ExtensionModule['run'] = async ({ term, display, hide }) => {
  const match = term.match(/^plugins?\s*(.+)?$/i)
  if (!match) return display([managerLauncherAction])

  display([temporalSearchAction])

  const plugins = await getPlugins()
  console.log(plugins)
  // const matchingPlugins = plugins.filter(
  //   ({ name }) => search([name], match[1]).length > 0
  // );

  // const categorizeResult = categorizePlugins(matchingPlugins);

  // const orderedPlugins = categorizeResult.map((plugin) =>
  //   pluginToResult(plugin, update)
  // );

  hide(TEMPORAL_ACTION_ID)

  // display(orderedPlugins);
}

const ExtensionsManagerExtension: ExtensionModule = {
  name: 'Extensions Manager',
  icon,
  run: fn,
  apps: {
    Manager: async ({ display }) => {
      display([testAppAction])
    }

  }
}

export default ExtensionsManagerExtension

export { initializeAsync } from './initializeAsync'

import type { PluginContext, PluginModule } from '@rokii/types';
import type { PluginInfo } from './types';
import { search } from '@rokii/utils';

import { open } from '@tauri-apps/api/shell';

import { getPlugins } from './utils/loadPlugins';
import * as format from './utils/format';
import { Preview } from './Preview';

import { CHANNELS } from '@/common/constants/events';
import { send } from '@/common/ipc';

const updatePlugin = async (update: PluginContext['update'], name: string) => {
  const plugins = await getPlugins();

  // TODO: This is a hack to get the updated plugin- need to find a better way
  const updatedPlugin = plugins.find((plugin) => plugin.name === name)!;

  const title = `${format.name(updatedPlugin.name)}`;

  send(CHANNELS.FocusInput)

  update(name, {
    title,
    subtitle: format.version(updatedPlugin),
    getPreview: () => (
      <Preview
        plugin={updatedPlugin}
        key={name}
        onComplete={() => updatePlugin(update, name)}
      />
    )
  });
};

const pluginToResult = (plugin: PluginInfo | string, update: PluginContext['update']) => {
  if (typeof plugin === 'string') return { title: plugin, icon: null };

  const title = `${format.name(plugin.name)}`;
  const subtitle = format.version(plugin);
  const repoLink = plugin.repo;

  const onSelect = repoLink ? () => open(repoLink) : undefined;

  return {
    icon: null,
    id: plugin.name,
    title,
    subtitle,
    onSelect,
    getPreview: () => (
      <Preview
        plugin={plugin}
        key={plugin.name}
        onComplete={() => updatePlugin(update, plugin.name)}
      />
    )
  };
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

export const fn: PluginModule['fn'] = async ({ term, display, hide, update }) => {
  const match = term.match(/^plugins?\s*(.+)?$/i);
  if (!match) return display({ title: 'Manage plugins' });

  display({ id: 'plugins-loading', title: 'Looking for plugins...' });

  const plugins = await getPlugins();
  const matchingPlugins = plugins.filter(
    ({ name }) => search([name], match[1]).length > 0
  );

  const categorizeResult = categorizePlugins(matchingPlugins);

  const orderedPlugins = categorizeResult.map((plugin) =>
    pluginToResult(plugin, update)
  );

  hide('plugins-loading');

  display(orderedPlugins);
};

export const name = 'Manage plugins';
export const keywords = ['plugins'];
export { default as icon } from '../icon.png';
export { initializeAsync } from './initializeAsync';

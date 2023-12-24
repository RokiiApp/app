import type { PluginModule } from '@rokii/types';

import { relaunch } from '@tauri-apps/api/process';

export { default as icon } from '../icon.png';
export const keywords = ['reload', 'restart', 'relaunch'];
export const name = 'Reload';

/**
 * Plugin to reload Rokii
 */
export const fn: PluginModule['fn'] = ({ display }) => {
  display({
    subtitle: 'Reload RoKii',
    onSelect: () => relaunch()
  });
};

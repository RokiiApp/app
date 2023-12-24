import type { PluginModule } from '@rokii/types';

import Settings from './Settings';

export { default as icon } from '../icon.png';
export const name = 'RoKii Settings';
export const keywords = ['RoKii Preferences', 'cfg', 'config', 'params'];

/**
 * Plugin to show app settings in results list
 */
export const fn: PluginModule['fn'] = ({ display, config }) => {
  const getPreview = () => (
    <Settings
      set={(key, value) => config.set(key, value)}
      get={(key) => config.get(key)}
    />
  );

  display({ order: 9, title: name, getPreview });

};

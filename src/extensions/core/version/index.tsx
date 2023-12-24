import type { PluginModule } from '@rokii/types';

import { getVersion } from '@tauri-apps/api/app';

export { default as icon } from '../icon.png';
export const name = 'Rokii Version';
export const keywords = ['version'];

/**
 * Plugin to show app version in results list
 */
export const fn: PluginModule['fn'] = async ({ display }) => {
  const version = await getVersion();

  const result = {
    order: 9,
    title: name,
    getPreview: () => (
      <div>
        <strong>{version}</strong>
      </div>
    )
  };

  display(result);
};

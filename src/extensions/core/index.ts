import type { PluginModule } from '@rokii/types';

import * as version from './version';
import * as quit from './quit';
import * as settings from './settings';
import * as reload from './reload';
import * as plugins from './plugins';
import * as apps from './apps';

export const corePlugins: Record<string, PluginModule> = Object.freeze({
  plugins,
  version,
  quit,
  settings,
  reload,
  apps
});

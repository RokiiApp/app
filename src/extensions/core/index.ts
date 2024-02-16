import type { ExtensionModule } from '../types';
import AppsExplorerExtension from './apps';
import QuitExtension from './quit';
import ReloadExtension from './reload';
import VersionExtension from './version';

const coreExtensions: Record<string, ExtensionModule> = {
  AppsExplorerExtension,
  QuitExtension,
  ReloadExtension,
  VersionExtension
};

Object.freeze(coreExtensions);

export { coreExtensions }

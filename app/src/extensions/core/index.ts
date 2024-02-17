import type { ExtensionModule } from '../types';
import AppsExplorerExtension from './apps';
import QuitExtension from './quit';
import ReloadExtension from './reload';
import VersionExtension from './version';
import ExtensionsManagerExtension from './extensions-manager';

const coreExtensions: Record<string, ExtensionModule> = {
  AppsExplorerExtension,
  ExtensionsManagerExtension,
  QuitExtension,
  ReloadExtension,
  VersionExtension
};

Object.freeze(coreExtensions);

export { coreExtensions }

import type { ExtensionModule } from '../types';
import VersionExtension from './version';
import AppsExplorerExtension from './apps';

const coreExtensions: Record<string, ExtensionModule> = {
  AppsExplorerExtension,
  VersionExtension,
};

Object.freeze(coreExtensions);

export { coreExtensions }

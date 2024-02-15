import type { Extension } from '../types';
import VersionExtension from './version';
import AppsExplorerExtension from './apps';

const coreExtensions: Record<string, Extension> = {
  AppsExplorerExtension,
  VersionExtension,
};

Object.freeze(coreExtensions);

export { coreExtensions }

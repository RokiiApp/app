import type { Extension } from '../types';
import VersionExtension from './version';

const corePlugins: Record<string, Extension> = {
  VersionExtension
};

Object.freeze(corePlugins);

export { corePlugins }

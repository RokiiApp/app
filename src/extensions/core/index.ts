import type { Extension } from '../types';
import VersionExtension from './version';

const coreExtensions: Record<string, Extension> = {
  VersionExtension
};

Object.freeze(coreExtensions);

export { coreExtensions }

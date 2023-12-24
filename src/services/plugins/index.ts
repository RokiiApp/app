import { NpmClient } from '@/services/NpmClient';
import { PLUGINS_PACKAGE_JSON_PATH, PLUGINS_PATH, ROKII_PATH } from '@/common/constants/paths';
import { exists, createDir, writeFile, } from "@tauri-apps/api/fs"

const ensureFile = async (src: string, content = '') => {
  if (!(await exists(src))) {
    writeFile(src, content);
  }
};

const ensureDir = async (path: string) => {
  if (!(await exists(path))) {
    createDir(path, { recursive: true })
  }
}

const EMPTY_PACKAGE_JSON = JSON.stringify(
  {
    name: 'rokii-plugins',
    dependencies: {}
  },
  null,
  2
);

export const ensureRokiNeededFiles = async () => {
  await exists(ROKII_PATH);
  await ensureDir(PLUGINS_PATH);
  ensureFile(PLUGINS_PACKAGE_JSON_PATH, EMPTY_PACKAGE_JSON);
};

export const client = new NpmClient(PLUGINS_PATH);
export { default as pluginSettings } from './settings';

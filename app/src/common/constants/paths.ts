import { appDataDir, join } from '@tauri-apps/api/path'

export const ROKII_PATH = await appDataDir()
export const PLUGINS_PATH = await join(ROKII_PATH, 'plugins')
export const PLUGINS_NODE_MODULES_PATH = await join(PLUGINS_PATH, 'node_modules')
export const PLUGINS_PACKAGE_JSON_PATH = await join(PLUGINS_PATH, 'package.json')

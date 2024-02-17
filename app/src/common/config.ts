import type { SettingsSchema } from '@rokii/types';

import { SettingsManager } from "tauri-settings"
import type { PathValue } from "tauri-settings/dist/types/dot-notation"

import { CHANNELS } from './constants/events';
import { THEMES } from './themes';
import { send } from '@/common/ipc';

const settingsManager = new SettingsManager<SettingsSchema>({
  locale: "en-US",
  lang: "en",
  country: "US",
  theme: THEMES[0].value,
  hotkey: "Control+Space",
  developerMode: false,
  cleanOnHide: true,
  selectOnShow: false,
  hideOnBlur: true,
  plugins: {},
  openAtLogin: true,
  winPosition: [0, 0]
}, { prettify: true })

await settingsManager.initialize();

/**
 * Get a value from global configuration
 */
function get<T extends keyof SettingsSchema>(key: T): SettingsSchema[T] {
  return settingsManager.getCache(key)
}

/**
 * Write a value to global config. It immedately rewrites global config
 * and notifies all listeners about changes
 *
 */
function set<T extends keyof SettingsSchema>(settingName: T, newValue: PathValue<SettingsSchema, T>) {
  const oldValue = settingsManager.getCache(settingName)
  settingsManager.set(settingName, newValue)

  // Notify all processes about settings changes
  console.log('[settings-changed]', { settingName, newValue, oldValue });

  send(CHANNELS.UpdateSettings, { settingName, newValue, oldValue })
}

export { get, set };

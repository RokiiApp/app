export interface SettingsSchema {
  locale: string
  lang: string
  country: string
  theme: string
  hotkey: string
  developerMode: boolean
  cleanOnHide: boolean
  selectOnShow: boolean
  hideOnBlur: boolean
  plugins: Record<string, unknown>
  openAtLogin: boolean
  winPosition: [x: number, y: number]
}

/**
 * Get a value from global configuration
*/
export type SettingsGetter = <T extends keyof SettingsSchema>(key: T) => SettingsSchema[T]

/**
 * Write a value to global config. It immedately rewrites global config
 * and notifies all listeners about changes
 */
export type SettingsSetter = <T extends keyof SettingsSchema>(key: T, value: SettingsSchema[T]) => void

export interface SettingsHandler {
  /**
   * Get a value from global configuration
  */
  get: SettingsGetter

  /**
   * Write a value to global config. It immedately rewrites global config
   * and notifies all listeners about changes
   */
  set: SettingsSetter
}

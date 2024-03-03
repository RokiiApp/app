import { StoredSetting } from "../ExtensionSettingsStore"

export type RokiiSettingsSchema = {
    /**
     * The id of the theme to use
     */
    theme: StoredSetting<string>,
    /**
     * The hotkey to toggle the Rokii window
     */
    hotkey: StoredSetting<string>,
    /**
     * Enable developer mode
     */
    developerMode: StoredSetting<boolean>,
    /**
     * Clear the input when the window is hidden
     */
    cleanOnHide: StoredSetting<boolean>,
    /**
     * Select the input when the window is shown
     */
    selectOnShow: StoredSetting<boolean>,
    /**
     * Hide the window when it loses focus
     */
    hideOnBlur: StoredSetting<boolean>,
    /**
     * Launch Rokii on system startup
     */
    openAtLogin: StoredSetting<boolean>
}

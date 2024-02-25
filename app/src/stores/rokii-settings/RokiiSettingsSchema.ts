export type RokiiSettingsSchema = {
    /**
     * The id of the theme to use
     */
    theme: string,
    /**
     * The hotkey to toggle the Rokii window
     */
    hotkey: string,
    /**
     * Enable developer mode
     */
    developerMode: boolean,
    /**
     * Clear the input when the window is hidden
     */
    cleanOnHide: boolean,
    /**
     * Select the input when the window is shown
     */
    selectOnShow: boolean,
    /**
     * Hide the window when it loses focus
     */
    hideOnBlur: boolean,
    /**
     * Launch Rokii on system startup
     */
    openAtLogin: boolean,
    /**
     * The position of the window
     */
    winPosition: [number, number]
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Here we don't care about the type of each extension setting
 * We just want to store the settings by extension name and setting id
 */
export type SavedExtensionSettings = Record<string, any>

export interface ExtensionSettingsStore {
    /**
     * Store all settings
     */
    settings: Record<string, SavedExtensionSettings>
    /**
     * Get all settings for a specific extension
     */
    getExtensionSettings: (extensionName: string) => SavedExtensionSettings
    /**
     * Set a setting by id
     */
    set: (extensionName: string, extensionSettings: SavedExtensionSettings) => void
    removeAll: (extensionName: string) => void
}

export const useExtensionsSettings = create<ExtensionSettingsStore>()(
    persist(
        (setStore, getStore) => ({
            settings: {},

            getExtensionSettings: (extensionName) => {
                const settings = getStore().settings

                return settings[extensionName]
            },

            set: (extension, extensionSettings) => {
                setStore(({ settings }) => {
                    const settingsAreEmpty = Object.keys(extensionSettings).length === 0
                    if (settingsAreEmpty) {
                        const newSettings = { ...settings }
                        delete newSettings[extension]
                        return { settings: newSettings }
                    }

                    const oldExtensionSettings = settings[extension] || {}
                    const newSettings = { ...oldExtensionSettings, ...extensionSettings }
                    return { settings: { ...settings, [extension]: newSettings } }
                })
            },

            removeAll: (extensionName) => {
                setStore(({ settings }) => {
                    const newSettings = { ...settings }
                    delete newSettings[extensionName]
                    return { settings: newSettings }
                })
            }
        }),

        { name: "extension-settings" }
    )
)
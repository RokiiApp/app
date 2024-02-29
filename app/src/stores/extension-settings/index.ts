import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ExtensionName = string
type ExtensionSettingId = string

export type StoredExtensionSettings = Record<ExtensionSettingId, StoredSetting>
type Settings = Record<ExtensionName, StoredExtensionSettings>

export type StoredSetting<T = any> = {
    id: ExtensionSettingId
    label: string
    description?: string
    value: T
}

export interface SettingsStore {
    /**
     * Store all settings
     */
    settings: Settings

    addSetting: <T>(extensionName: string, setting: StoredSetting<T>) => void
    addSettings: (extensionName: string, settings: StoredExtensionSettings) => void
    getAllFromExtension: (extensionName: ExtensionName) => StoredExtensionSettings
    deleteAllFromExtension: (extensionName: ExtensionName) => void
}

export const useExtensionSettings = create<SettingsStore>()(
    persist(
        (set, get) => ({
            settings: {},

            addSetting: (extensionName: string, incomingSetting) => {
                set(({ settings }) => {
                    const newSettings = {
                        ...settings,
                        [extensionName]: {
                            ...settings[extensionName],
                            [incomingSetting.id]: incomingSetting
                        }
                    }

                    return { settings: newSettings }
                })
            },

            addSettings: (extensionName, incomingSettings) => {
                set(({ settings }) => {
                    const settingsAreEmpty = Object.keys(incomingSettings).length === 0
                    if (settingsAreEmpty) {
                        const newSettings = { ...settings }
                        delete newSettings[extensionName]
                        return { settings: newSettings }
                    }

                    const newSettings = {
                        ...settings,
                        [extensionName]: incomingSettings
                    }

                    return { settings: newSettings }
                })
            },

            getAllFromExtension: (extensionName) => {
                const settings = get().settings

                return settings[extensionName] || {}
            },

            deleteAllFromExtension: (extensionName) => {
                set(({ settings }) => {
                    const newSettings = { ...settings }
                    delete newSettings[extensionName]
                    return { settings: newSettings }
                })
            }
        }),

        { name: "extension-settings" }
    )
)

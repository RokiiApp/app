import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RokiiSettingsSchema } from './RokiiSettingsSchema'
import { defaultSettings } from './defaultSettings'

export interface RokiiSettings {
    /**
     * Store all settings
     */
    settings: RokiiSettingsSchema

    /**
     * We store the prevouis hotkey to unregister it when the hotkey changes
     */
    prevHotkey: string

    get: <T extends keyof RokiiSettingsSchema>(settingName: T) => RokiiSettingsSchema[T]

    set: <T extends keyof RokiiSettingsSchema>(settingName: T, value: RokiiSettingsSchema[T]) => void
}

export const useRokiiSettingsStore = create<RokiiSettings>()(
    persist(
        (set, getStore) => ({
            settings: defaultSettings,
            prevHotkey: defaultSettings.hotkey,
            get: (settingName) => {
                const settings = getStore().settings
                return settings[settingName]
            },
            set: (settingName, value) => {
                const settings = getStore().settings
                let prevHotkey = settings.hotkey
                settings[settingName] = value

                settingName === 'hotkey'
                    ? set(() => ({ settings, prevHotkey }))
                    : set(() => ({ settings }))
            }
        }),

        { name: "rokii-settings" }
    )
)

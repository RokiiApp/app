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
        (setStore, getStore) => ({
            settings: defaultSettings,
            prevHotkey: defaultSettings.hotkey,
            get: (settingName) => {
                const settings = getStore().settings
                return settings[settingName]
            },
            set: (settingName, value) => {
                const oldSettings = getStore().settings
                let prevHotkey = oldSettings.hotkey

                const settings = { ...oldSettings, [settingName]: value }

                settingName === 'hotkey'
                    ? setStore(({ settings, prevHotkey }))
                    : setStore(({ settings }))
            }
        }),

        { name: "rokii-settings" }
    )
)

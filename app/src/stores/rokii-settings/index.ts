import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RokiiSettingsSchema } from './RokiiSettingsSchema'
import { defaultSettings } from './defaultSettings'

export interface RokiiSettingsStore extends RokiiSettingsSchema {
    getAllSettings: () => RokiiSettingsSchema

    getSetting: <T extends keyof RokiiSettingsSchema>(settingName: T) => RokiiSettingsSchema[T]

    setSetting: <T extends keyof RokiiSettingsSchema>(settingName: T, value: RokiiSettingsSchema[T]) => void
}

export const useRokiiSettingsStore = create<RokiiSettingsStore>()(
    persist(
        (setStore, getStore) => ({
            ...defaultSettings,
            getAllSettings: () => {
                const { getSetting, getAllSettings, setSetting, ...settings } = getStore()
                return settings
            },
            getSetting: (settingName) => {
                const setting = getStore()[settingName]
                return setting
            },
            setSetting: (settingName, value) => {
                setStore(({ [settingName]: value }))
            }
        }),

        { name: "rokii-settings" }
    )
)

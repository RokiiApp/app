import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RokiiSettingsSchema } from './RokiiSettingsSchema'
import { defaultSettings } from './defaultSettings'

export interface RokiiSettingsStore extends RokiiSettingsSchema {
    getAllSettings: () => RokiiSettingsSchema

    getSetting: <T extends keyof RokiiSettingsSchema>(settingName: T) => RokiiSettingsSchema[T]

    setSetting: <T extends keyof RokiiSettingsSchema>(settingName: T, value: RokiiSettingsSchema[T]) => void
}

export const useRokiiSettings = create<RokiiSettingsStore>()(
    persist(
        (setStore, getStore) => ({
            ...defaultSettings,
            getAllSettings: () => {
                const { getSetting, getAllSettings, setSetting, ...settings } = getStore()
                return settings
            },
            getSetting: <T extends keyof RokiiSettingsSchema>(settingName: T) => {
                const setting = getStore()[settingName]
                return setting
            },
            setSetting: <T extends keyof RokiiSettingsSchema>(settingName: T, value: RokiiSettingsSchema[T]) => {
                setStore(({ [settingName]: value }))
            }
        }),

        { name: "rokii-settings" }
    )
)

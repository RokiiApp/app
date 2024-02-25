import { useRokiiSettingsStore } from "@/stores/rokii-settings"
import { useEffect } from "react"
import { changeTheme } from "../utils/changeTheme"
import { AutoStart } from "@/services/AutoStart"
import { invoke } from "@tauri-apps/api"
import { registerToggleShortcut } from "@/services/registerToggleShortcut"

export const useRokiiSettings = () => {
    const {
        developerMode,
        hotkey,
        openAtLogin,
        theme
    } = useRokiiSettingsStore(s => s.settings)
    const prevHotkey = useRokiiSettingsStore(s => s.prevHotkey)

    useEffect(() => {
        registerToggleShortcut(prevHotkey, hotkey)
    }, [hotkey])

    useEffect(() => {
        changeTheme(theme)
    }, [theme])

    useEffect(() => {
        invoke('set-tray-dev', { to: developerMode })
    }, [developerMode])

    useEffect(() => {
        AutoStart.set(openAtLogin)
    }, [openAtLogin])

}

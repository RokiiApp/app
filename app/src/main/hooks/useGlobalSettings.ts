import { useEffect, useMemo, useState } from "react"
import { changeTheme } from "../utils/changeTheme"
import { AutoStart } from "@/services/AutoStart"
import { globalShortcut, invoke } from "@tauri-apps/api"
import { registerToggleShortcut } from "@/services/registerToggleShortcut"
import { useRokiiSettings } from "@/stores/rokii-settings"

export const useGlobalSettings = () => {
    const [prevHotkey, setPrevHotkey] = useState("")
    const settings = useRokiiSettings(s => s.getAllSettings())

    const { developerMode, hotkey, openAtLogin, theme } = settings

    useEffect(() => {
        registerToggleShortcut(prevHotkey, hotkey.value)
        setPrevHotkey(hotkey.value)

        return () => {
            // Unregister all shortcuts to avoid conflicts
            globalShortcut.unregisterAll()
        }
    }, [hotkey])

    useEffect(() => {
        changeTheme(theme.value)
    }, [theme])

    useEffect(() => {
        invoke('set-tray-dev', { to: developerMode })
    }, [developerMode])

    useEffect(() => {
        AutoStart.set(openAtLogin.value)
    }, [openAtLogin])
}

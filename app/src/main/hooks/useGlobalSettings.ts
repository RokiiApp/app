import { useEffect } from "react"
import { changeTheme } from "../utils/changeTheme"
import { AutoStart } from "@/services/AutoStart"
import { invoke } from "@tauri-apps/api/core"
import { useRokiiSettings } from "@/stores/rokii-settings"
import { WindowManager } from "@/services/WindowManager"

export const useGlobalSettings = () => {
    const settings = useRokiiSettings(s => s.getAllSettings())

    const { developerMode, hotkey, openAtLogin, theme } = settings

    useEffect(() => {
        WindowManager.setToggleShortcut(hotkey.value)

        return () => {
            // Unregister all shortcuts to avoid conflicts
            WindowManager.removeToggleShortcut(hotkey.value)
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

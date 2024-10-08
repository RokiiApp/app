import { useEffect } from "react"
import { changeTheme } from "../utils/changeTheme"
import { AutoStart } from "@/services/AutoStart"
import { useRokiiSettings } from "@/stores/rokii-settings"
import { WindowManager } from "@/services/WindowManager"
import { TrayMenu } from "@/services/TrayMenu"

export const useGlobalSettings = () => {
    const settings = useRokiiSettings(s => s.getAllSettings())

    const { developerMode, hotkey, openAtLogin, theme } = settings

    useEffect(() => {
        WindowManager.removeAllShortcuts().then(
            () => WindowManager.setToggleShortcut(hotkey.value)
        )
    }, [hotkey])

    useEffect(() => {
        changeTheme(theme.value)
    }, [theme])

    useEffect(() => {
        const menuType = developerMode.value ? "development" : "standard"

        const rokiiTray = TrayMenu.create(menuType)

        return () => {
            rokiiTray.then(trayMenu => trayMenu.delete())
        }
    }, [developerMode])

    useEffect(() => {
        AutoStart.set(openAtLogin.value)
    }, [openAtLogin])
}

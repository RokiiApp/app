import { toggleWindow } from "./toggleWindow"
import { globalShortcut } from "@tauri-apps/api"

export const registerToggleShortcut = async (prevHotkey: string, newHotkey: string) => {
    try {
        await globalShortcut.unregister(prevHotkey)
        await globalShortcut.register(newHotkey, toggleWindow)
    } catch (e) {
        console.error(e)
    }
}

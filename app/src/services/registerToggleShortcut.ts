import { toggleWindow } from "./toggleWindow"
import { globalShortcut } from "@tauri-apps/api"

export const registerToggleShortcut = async (prevHotkey: string, newHotkey: string) => {
    await globalShortcut.unregister(prevHotkey)
    try {
        await globalShortcut.register(newHotkey, toggleWindow)
    } catch (e) {
        console.error(e)
    }
}

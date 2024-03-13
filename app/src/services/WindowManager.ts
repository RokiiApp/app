import { appWindow } from "@tauri-apps/api/window"
import { invoke } from '@tauri-apps/api'
import { globalShortcut } from "@tauri-apps/api"
import { send } from '@/common/ipc'
import { CHANNELS } from '@/common/constants/events'
import { useRokiiSettings } from '@/stores/rokii-settings'

const WindowManager = {
    hide() {
        return appWindow.hide()
    },

    async toggle() {
        const cleanOnHide = useRokiiSettings.getState().cleanOnHide

        if (cleanOnHide.value) {
            send(CHANNELS.ClearInput)
        }

        await invoke('toggle_window_visibility')
    },

    async setToggleShortcut(prevHotkey: string, newHotkey: string) {
        try {
            await globalShortcut.unregister(prevHotkey)
            await globalShortcut.register(newHotkey, WindowManager.toggle)
        } catch (e) {
            console.error(e)
        }
    }
}

Object.freeze(WindowManager)

export { WindowManager }

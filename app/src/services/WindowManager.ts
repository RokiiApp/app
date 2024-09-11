import { getCurrentWindow } from "@tauri-apps/api/window"
import { invoke } from '@tauri-apps/api/core'
import * as globalShortcut from "@tauri-apps/plugin-global-shortcut"
import { send } from '@/common/ipc'
import { CHANNELS } from '@/common/constants/events'
import { useRokiiSettings } from '@/stores/rokii-settings'

const currentWindow = getCurrentWindow()

const WindowManager = {
    hide() {
        return currentWindow.hide()
    },

    async toggle() {
        const cleanOnHide = useRokiiSettings.getState().cleanOnHide

        if (cleanOnHide.value) {
            send(CHANNELS.ClearInput)
        }

        await invoke('toggle_window_visibility')
    },

    async setToggleShortcut(newHotkey: string) {
        try {
            await globalShortcut.register(newHotkey, (e => {
                e.state === 'Released' && WindowManager.toggle()
            }))
        } catch (e) {
            console.error(e)
        }
    },

    async removeToggleShortcut(hotkey: string) {
        try {
            await globalShortcut.unregister(hotkey)
        } catch (e) {
            console.error(e)
        }
    },

    async removeAllShortcuts() {
        try {
            await globalShortcut.unregisterAll()
        } catch (e) {
            console.error(e)
        }
    }
}

Object.freeze(WindowManager)

export { WindowManager }

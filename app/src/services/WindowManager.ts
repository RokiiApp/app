import { appWindow } from "@tauri-apps/api/window"

const WindowManager = {
    hide() {
        return appWindow.hide()
    }
}

Object.freeze(WindowManager)

export { WindowManager }

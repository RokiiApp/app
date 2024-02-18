import { blurListener } from './windowListeners'
import { TauriEvent } from '@tauri-apps/api/event'
import { on } from '@/common/ipc'
import * as config from '@/common/config'
import { globalShortcut } from '@tauri-apps/api'
import { toggleWindow } from '@/services/toggleWindow'

export const setupWindowListeners = () => {
  globalShortcut.unregisterAll().then(() => {
    globalShortcut.register(config.get('hotkey'), toggleWindow)
  })

  on(TauriEvent.WINDOW_BLUR, blurListener)

  window.addEventListener('keydown', (e) => {
    // SHORTCUTS DISABLED FOR BOTH PRODUCTION AND DEVELOPMENT

    // Print
    if (e.ctrlKey && e.code === 'KeyP') {
      e.preventDefault()
    }

    // Find
    if (e.ctrlKey && e.code === 'KeyF' || e.key === 'F3' || e.ctrlKey && e.code === 'KeyG') {
      e.preventDefault()
    }

    // Navigate with keyboard (We handle this ourselves)
    if (e.code === 'F7') {
      e.preventDefault()
    }

    // SHORTCUTS ENABLED FOR DEVELOPMENT ONLY

    if (config.get('developerMode')) return

    // Developer tools
    if (e.code === 'F12' || (e.ctrlKey && e.shiftKey && e.code === 'KeyI')) {
      e.preventDefault()
    }

    // Reload
    if (e.ctrlKey && e.code === 'KeyR' || e.key === 'F5') {
      e.preventDefault()
    }

    // View source code
    if (e.ctrlKey && e.code === 'KeyU') {
      e.preventDefault()
    }
  })
}

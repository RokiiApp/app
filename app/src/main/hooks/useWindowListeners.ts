import { on } from "@/common/ipc"
import { TauriEvent } from "@tauri-apps/api/event"
import { useEffect } from "react"
import { blurListener } from '../windowListeners'
import { useRokiiSettings } from "@/stores/rokii-settings"

export const useWindowListeners = () => {
    const developerMode = useRokiiSettings(s => s.developerMode)

    useEffect(() => {
        const unlistenPromise = on(TauriEvent.WINDOW_BLUR, blurListener)

        return () => {
            unlistenPromise.then((unlisten) => unlisten())
        }
    }, [])

    useEffect(() => {
        const onKeyDown = onKeyDownListener(developerMode.value)
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener("contextmenu", (e) => e.preventDefault())

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [developerMode])
}

const onKeyDownListener = (isDevelopmentMode: boolean) => (e: KeyboardEvent) => {
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

    if (isDevelopmentMode) return

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
}



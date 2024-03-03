import { on, send } from '@/common/ipc'
import { useInputStore } from '@/stores/InputStore'
import { TauriEvent } from '@tauri-apps/api/event'
import { CHANNELS } from '@/common/constants/events'

import { useEffect } from 'react'
import { useRokiiSettings } from '@/stores/rokii-settings'

export const useSearchBarEventsSubscription = (mainInput: React.RefObject<HTMLInputElement>) => {
  const updateTerm = useInputStore(s => s.updateTerm)
  const selectOnShow = useRokiiSettings(s => s.selectOnShow)

  const onDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      send(CHANNELS.FocusInput)
    }
  }

  const handleShowEvent = () => {
    send(CHANNELS.FocusInput)

    if (selectOnShow.value) {
      mainInput.current?.select()
    }
  }

  const cleanup = () => {
    window.removeEventListener('keydown', onDocumentKeydown)
    window.removeEventListener('beforeunload', cleanup)
  }

  useEffect(() => {
    if (!mainInput) return

    // Add some global key handlers
    window.addEventListener('keydown', onDocumentKeydown)
    // Cleanup event listeners on unload
    // NOTE: when page refreshed (location.reload) componentWillUnmount is not called
    window.addEventListener('beforeunload', cleanup)

    on(TauriEvent.WINDOW_FOCUS, handleShowEvent)
    on(CHANNELS.ClearInput, () => updateTerm(''))
    on(CHANNELS.ShowTerm, ({ payload }) => updateTerm(payload))

    // function to be called when unmounted
    return () => {
      cleanup()
    }
  }, [mainInput])
}

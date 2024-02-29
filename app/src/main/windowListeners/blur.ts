import { appWindow } from '@tauri-apps/api/window'
import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'

export const blurListener = () => {
  const hideOnBlur = useRokiiSettingsStore.getState().hideOnBlur
  const cleanOnHide = useRokiiSettingsStore.getState().cleanOnHide
  if (hideOnBlur.value) {
    appWindow.hide()

    if (cleanOnHide.value) {
      send(CHANNELS.ClearInput)
    }
  }
}

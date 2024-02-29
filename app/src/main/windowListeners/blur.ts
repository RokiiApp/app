import { appWindow } from '@tauri-apps/api/window'
import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { useRokiiSettings } from '@/stores/rokii-settings'

export const blurListener = () => {
  const hideOnBlur = useRokiiSettings.getState().hideOnBlur
  const cleanOnHide = useRokiiSettings.getState().cleanOnHide
  if (hideOnBlur.value) {
    appWindow.hide()

    if (cleanOnHide.value) {
      send(CHANNELS.ClearInput)
    }
  }
}

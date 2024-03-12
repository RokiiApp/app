import { WindowManager } from '@/services/WindowManager'
import { useRokiiSettings } from '@/stores/rokii-settings'
import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'

export const blurListener = () => {
  const hideOnBlur = useRokiiSettings.getState().hideOnBlur
  const cleanOnHide = useRokiiSettings.getState().cleanOnHide
  if (hideOnBlur.value) {
    WindowManager.hide()

    if (cleanOnHide.value) {
      send(CHANNELS.ClearInput)
    }
  }
}

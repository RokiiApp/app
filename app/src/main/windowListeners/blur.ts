import { appWindow } from '@tauri-apps/api/window'
import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'

export const blurListener = () => {
  const { settings } = useRokiiSettingsStore.getState()
  if (settings.hideOnBlur) {
    appWindow.hide()

    if (settings.cleanOnHide) {
      send(CHANNELS.ClearInput)
    }
  }
}

import { invoke } from '@tauri-apps/api'
import { send } from '@/common/ipc'
import { CHANNELS } from '@/common/constants/events'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'

export const toggleWindow = () => {
  const { settings } = useRokiiSettingsStore.getState()
  if (settings.cleanOnHide) {
    send(CHANNELS.ClearInput)
  }
  invoke('toggle_window_visibility')
}

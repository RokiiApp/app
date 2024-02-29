import { invoke } from '@tauri-apps/api'
import { send } from '@/common/ipc'
import { CHANNELS } from '@/common/constants/events'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'

export const toggleWindow = () => {
  const cleanOnHide = useRokiiSettingsStore.getState().cleanOnHide
  if (cleanOnHide.value) {
    send(CHANNELS.ClearInput)
  }
  invoke('toggle_window_visibility')
}

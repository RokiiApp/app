import { invoke } from '@tauri-apps/api'
import * as config from '@/common/config'
import { send } from '@/common/ipc'
import { CHANNELS } from '@/common/constants/events'

export const toggleWindow = () => {
  if (config.get('cleanOnHide')) {
    send(CHANNELS.ClearInput)
  }
  invoke('toggle_window_visibility')
}

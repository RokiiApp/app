import { invoke } from '@tauri-apps/api';
import * as config from '@/common/config';
import { send } from '@/common/ipc';

export const toggleWindow = () => {
  if (config.get("cleanOnHide")) {
    send("clear-input")
  }
  invoke("toggle_window_visibility")
};

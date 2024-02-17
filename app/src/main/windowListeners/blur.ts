import * as config from '@/common/config';
import { appWindow } from '@tauri-apps/api/window';
import { CHANNELS } from '@/common/constants/events';
import { send } from '@/common/ipc';

export const blurListener = () => {
  if (config.get('hideOnBlur')) {
    appWindow.hide();

    if (config.get('cleanOnHide')) {
      send(CHANNELS.ClearInput);
    }
  }

};

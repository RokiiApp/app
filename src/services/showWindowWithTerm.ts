import { CHANNELS } from '@/common/constants/events';
import { appWindow } from '@tauri-apps/api/window';
import { send } from '@/common/ipc';

export const showWindowWithTerm = async (term: string) => {
  await appWindow.show();
  await appWindow.setFocus();
  send(CHANNELS.ShowTerm, term);
};

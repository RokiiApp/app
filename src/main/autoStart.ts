import { enable, isEnabled, disable } from 'tauri-plugin-autostart-api';

const isAutoStartEnabled = async () => await isEnabled()

const setAutoStart = async (openAtLogin: boolean) => {
  return openAtLogin ? await enable() : await disable()
};

export { isAutoStartEnabled, setAutoStart };

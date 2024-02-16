import { CHANNELS } from '@/common/constants/events';
import { AutoStart } from '@/services/AutoStart';
import { invoke, globalShortcut } from '@tauri-apps/api';
import { changeTheme } from './utils/changeTheme';
import { on } from '@/common/ipc';
import { SettingsSchema } from '@rokii/types';
import { toggleWindow } from '@/services/toggleWindow';

type HandlerMap<T extends SettingsSchema> = {
  [K in keyof T]: HandlerFunction<T[K]>;
};

type HandlerFunction<T> = ({ newValue, oldValue }: { newValue: T, oldValue: T }) => void;

function createHandlers<T extends SettingsSchema>(handlers: Partial<HandlerMap<T>>): HandlerMap<T> {
  const completeHandlers: HandlerMap<T> = {} as HandlerMap<T>;

  for (const key in handlers) {
    if (handlers.hasOwnProperty(key)) {
      completeHandlers[key] = handlers[key] as HandlerFunction<T[keyof T]>;
    }
  }

  return completeHandlers;
}

const SETTING_HANDLERS = createHandlers({
  developerMode: ({ newValue }) => {
    invoke("set-tray-dev", { to: newValue })
  },

  openAtLogin: ({ newValue }) => {
    AutoStart.set(newValue);
  },

  hotkey: async ({ newValue, oldValue }) => {
    await globalShortcut.unregister(oldValue)
    await globalShortcut.register(newValue, () => toggleWindow())
  },

  theme: ({ newValue }) => {
    changeTheme(newValue)
  }
});

const setupSettingsListener = () => {
  on(CHANNELS.UpdateSettings, ({ payload }) => {
    const { settingName, newValue, oldValue } = payload

    const handler = SETTING_HANDLERS[settingName] as HandlerFunction<SettingsSchema[typeof settingName]>;

    if (handler) {
      handler({ newValue, oldValue });
    }

  });
};

export { setupSettingsListener };

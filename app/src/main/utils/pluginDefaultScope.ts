import * as config from '@/common/config';
import { open } from "@tauri-apps/api/shell";
import { writeText } from "@tauri-apps/api/clipboard";
import { getCurrent } from "@tauri-apps/api/window";

/**
 * Default scope object would be first argument for plugins
 *
 */
export const DEFAULT_SCOPE = {
  config,
  actions: {
    open: (url: string) => open(url),
    // TODO: Does this work?
    reveal: (path: string) => open(path, "explorer"),
    copyToClipboard: (text: string) => writeText(text),
    hideWindow: () => getCurrent().hide()
  }
};

import * as config from '@/common/config'
import { open } from '@tauri-apps/api/shell'
import { writeText } from '@tauri-apps/api/clipboard'
import { getCurrent } from '@tauri-apps/api/window'

/**
 * Default scope object would be first argument for plugins
 *
 */
export const DEFAULT_SCOPE = {
  config,
  actions: {
    open: async (url: string) => await open(url),
    // TODO: Does this work?
    reveal: async (path: string) => await open(path, 'explorer'),
    copyToClipboard: async (text: string) => await writeText(text),
    hideWindow: async () => await getCurrent().hide()
  }
}

import type { ExtensionContext } from '@rokii/api'
import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { useActionsStore } from '@/stores/actions'
import { useSettingsStore } from '@/stores/settings'
import { writeText } from '@tauri-apps/api/clipboard'
import { appWindow } from '@tauri-apps/api/window'
import { open } from '@tauri-apps/api/shell'

export class ExtensionContextProvider {
  extensionName: string

  constructor(extensionName: string) {
    this.extensionName = extensionName
  }

  public get(term: string): ExtensionContext {
    const extensionContext = this.createExtensionContext(term)

    return extensionContext
  }

  /**
     * The method that provides the API to the plugin
     * @param term The input value from the user
     */
  private createExtensionContext(term: string): ExtensionContext {
    const context: ExtensionContext = {
      term,
      display: async (actions) => {
        const actionsStore = useActionsStore.getState()
        actionsStore.addActions(actions, this.extensionName)
      },
      hide(id) {
        const actionsStore = useActionsStore.getState()
        actionsStore.removeAction(id)
      },
      update: (id, action) => {
        const actionsStore = useActionsStore.getState()
        const fullId = `${this.extensionName}-${id}`
        actionsStore.updateAction(fullId, action)
      },
      actions: {
        reveal: async (path) => {
          await open(path, 'explorer')
        },
        open: async (url) => {
          await open(url)
        },
        copyToClipboard: async (text) => {
          await writeText(text)
        },
        hideWindow: async () => {
          await appWindow.hide()
        },
        replaceTerm: async (term) => {
          send(CHANNELS.ShowTerm, term)
        }
      },
      settings: useSettingsStore.getState().getAllFromExtension(this.extensionName)
    }

    return context
  }
}

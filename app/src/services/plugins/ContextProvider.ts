import type { ExtensionContext } from '@rokii/api'
import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { ZustandResultsStore } from '@/entities/ResultsStore'
import { useExtensionSettings } from '@/stores/ExtensionSettingsStore'
import { writeText } from '@tauri-apps/api/clipboard'
import { appWindow } from '@tauri-apps/api/window'
import { open } from '@tauri-apps/api/shell'

export class ExtensionContextProvider {
  extensionName: string
  resultsStore: ZustandResultsStore

  constructor(extensionName: string, resultsStore: ZustandResultsStore) {
    this.extensionName = extensionName
    this.resultsStore = resultsStore
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
        const actionsStore = this.resultsStore.getState()
        actionsStore.addActions(actions, this.extensionName)
      },
      hide: (id) => {
        const actionsStore = this.resultsStore.getState()
        actionsStore.removeAction(id)
      },
      update: (id, action) => {
        const actionsStore = this.resultsStore.getState()
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
      settings: this.getExtensionSettings()
    }

    return context
  }

  /**
   * Maps the settings from the store to the settings object that is provided to the plugin
   */
  private getExtensionSettings() {
    const savedSettings = useExtensionSettings.getState().getAllFromExtension(this.extensionName)
    const settingsResult: Record<string, any> = {}

    for (const setting of Object.values(savedSettings)) {
      settingsResult[setting.id] = setting.value
    }

    return settingsResult
  }
}

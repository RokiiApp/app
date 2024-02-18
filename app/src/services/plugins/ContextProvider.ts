import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { ExtensionContext } from '@/extensions/types'
import { useActionsStore } from '@/stores/actions'

export class ExtensionContextProvider {
  extensionName: string

  constructor (extensionName: string) {
    this.extensionName = extensionName
  }

  public get (term: string): ExtensionContext {
    const extensionContext = this.createExtensionContext(term)

    return extensionContext
  }

  /**
     * The method that provides the API to the plugin
     * @param term The input value from the user
     */
  private createExtensionContext (term: string): ExtensionContext {
    const context: ExtensionContext = {
      term,
      display: async (actions) => {
        const actionsStore = useActionsStore.getState()
        actionsStore.addActions(actions, this.extensionName)
      },
      hide (id) {
        const actionsStore = useActionsStore.getState()
        actionsStore.removeAction(id)
      },
      update: (id, action) => {
        const actionsStore = useActionsStore.getState()
        actionsStore.updateAction(id, action)
      },
      actions: {
        replaceTerm: async (term) => {
          send(CHANNELS.ShowTerm, term)
        }
      }
    }

    return context
  }
}

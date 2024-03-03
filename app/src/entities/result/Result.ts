import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { Item } from '@rokii/api'
import { appWindow } from '@tauri-apps/api/window'
import { Icon, ensureIcon } from "@/entities/Icon"

/**
 * A result corresponds to a row in the results list component.
 * It contains the data to be displayed and the logic to be executed
 * when the result is selected.
 * 
 */
export class Result {
    extension: string
    title: string
    subtitle: string
    /**
     * A base64 encoded image that represents an icon.
     */
    icon: Icon
    autocomplete: string
    /**
     * The id of a result is unique for all the results in the app
     * It's used to update or remove the action from the store
     * The id schema is `${extensionName}-${actionId}`
     */
    readonly id: `${string}-${string}`
    keywords: string[] | undefined
  
    constructor(action: Item, extensionName: string) {  
      this.title = action.title
      this.subtitle = action.subtitle || ''
      this.icon = ensureIcon(action.icon)
      this.extension = extensionName
      this.autocomplete = action.autocomplete || action.title
      this.id = `${extensionName}-${action.id}`
      this.keywords = action.keyword
    }
  
    update(newAction: Item) {
      this.title = newAction.title
      this.subtitle = newAction.subtitle || ''
      this.icon = newAction.icon || ''
  
      return this
    }
  
    async onSelect(e: Event | React.SyntheticEvent) {
      if (e.defaultPrevented) return
      send(CHANNELS.ClearInput)
      await appWindow.hide()
    };
  }

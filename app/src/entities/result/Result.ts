import defaultIcon from "@/extensions/core/icon.png"
import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { Item } from '@rokii/api'
import { appWindow } from '@tauri-apps/api/window'

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
    icon: string
    autocomplete: string
    /**
     * The id of a result is unique for all the results in the app
     * It's used to update or remove the action from the store
     * The id schema is `${extensionName}-${actionId}`
     */
    readonly id: `${string}-${string}`
    keywords: string[] | undefined
  
    constructor(action: Item, extensionName: string) {
      let calculatedIcon = ""
  
      // We support null icon to avoid showing the default icon
      if (action.icon === null) {
        calculatedIcon = ""
      } else {
        calculatedIcon = action.icon ?? defaultIcon
      }
  
      this.title = action.title
      this.subtitle = action.subtitle || ''
      this.icon = calculatedIcon
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
